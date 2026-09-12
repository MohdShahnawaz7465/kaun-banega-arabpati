// Kaun Banega Arabpati - Modern C++ Port
// Original DOS/Turbo C++ version by Jayant Kumar Gandhi (2000)
// Ported to standard, portable C++17 - no DOS/BGI/assembly dependencies.
//
// Build:  g++ -std=c++17 -O2 -o kbap kbap.cpp
// Run:    ./kbap

#include <iostream>
#include <string>
#include <vector>
#include <array>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <cctype>
#include <limits>

struct Question {
    std::string text;
    std::array<std::string, 4> options;
    int correctIndex;   // 0-based
    std::string prize;
};

// The original 15 questions, extracted from the original DATA.DAT binary file.
static const std::vector<Question> QUESTIONS = {
    {"Who directed the movie 'Jurassic Park'?",
     {"John Williams", "Hans Solo", "Steven Spielberg", "John Woo"}, 2, "2,500"},
    {"Queensland, Victoria are in ...",
     {"Wales", "Ireland", "Australia", "Germany"}, 2, "5,000"},
    {"Earthquakes are measured in ___ scale?",
     {"Vibration", "Red", "Shake", "Richter"}, 3, "10,000"},
    {"What is lycanthrope?",
     {"A chemical", "A disease", "A werewolf", "Plastic"}, 2, "20,000"},
    {"Eastern most state in USA?",
     {"Alaska", "Nova Scotia", "New York", "Maine"}, 0, "40,000"},
    {"A 'herbivore' is an animal that eats:",
     {"at McDonald's", "only Meat", "Meat and Plants", "only Plants"}, 3, "80,000"},
    {"Human beings are:",
     {"Carnivores", "Omnivores", "Herbivores", "3D Special Effects"}, 1, "1,60,000"},
    {"Study of Sound?",
     {"Acoustics", "Biology", "Morphology", "Soundology"}, 0, "3,20,000"},
    {"Common name for 'Bellis perennis':",
     {"Lily", "Daisy", "Rosy", "Rose"}, 1, "6,25,000"},
    {"What is NaCl?",
     {"Rock Salt", "Common Salt", "Zeise Salt", "National Clay"}, 1, "12,50,000"},
    {"Southern most tip of India?",
     {"Indra Point", "Kashmir", "Kanyakumari", "Mumbai"}, 0, "25,00,000"},
    {"Which is the oldest game in the world?",
     {"Cricket", "Football", "Hockey", "Polo"}, 3, "50,00,000"},
    {"Which country has the largest railway network?",
     {"USA", "India", "Australia", "Japan"}, 1, "1,00,00,000"},
    {"The only animal having 4 knees is ...",
     {"Monkey", "Giraffe", "Elephant", "Dog"}, 2, "10,00,00,000"},
    {"Who wrote 'Time Machine'?",
     {"H. G. Wells", "Amrita Pritam", "Shakespeare", "John Hunt"}, 0, "1,00,00,00,000"}
};

// Safe (guaranteed) checkpoint prizes - every 5th question, like the real show.
static bool isSafeLevel(int questionIndex /*0-based*/) {
    int qNum = questionIndex + 1;
    return qNum == 5 || qNum == 10 || qNum == 15;
}

struct Lifelines {
    bool fiftyFifty = true;
    bool askAudience = true;
    bool phoneFriend = true;
};

static void printDivider() {
    std::cout << std::string(60, '-') << "\n";
}

static void printBanner() {
    printDivider();
    std::cout << "   K A U N   B A N E G A   A R A B - P A T I\n";
    std::cout << "   (Who Wants To Be A Billionaire?)\n";
    std::cout << "   Modern C++ port - original by Jayant Kumar Gandhi (2000)\n";
    printDivider();
}

static int readMenuChoice(const std::string& prompt, int minVal, int maxVal) {
    while (true) {
        std::cout << prompt;
        std::string line;
        if (!std::getline(std::cin, line)) { std::exit(0); }
        if (line.size() == 1 && line[0] >= ('0' + minVal) && line[0] <= ('0' + maxVal)) {
            return line[0] - '0';
        }
        std::cout << "Invalid choice, try again.\n";
    }
}

// Fifty-fifty: remove two wrong answers, return which two indices got removed.
static std::vector<int> applyFiftyFifty(const Question& q) {
    std::vector<int> wrongIndices;
    for (int i = 0; i < 4; i++)
        if (i != q.correctIndex) wrongIndices.push_back(i);
    // shuffle & drop 2 of the 3 wrong answers
    for (size_t i = wrongIndices.size() - 1; i > 0; --i) {
        size_t j = std::rand() % (i + 1);
        std::swap(wrongIndices[i], wrongIndices[j]);
    }
    return {wrongIndices[0], wrongIndices[1]}; // these two get hidden
}

// Ask the Audience: simulate a poll biased toward the correct answer.
static std::array<int, 4> simulateAudiencePoll(const Question& q, const std::vector<int>& hidden) {
    std::array<int, 4> pct = {0, 0, 0, 0};
    int remaining = 100;
    int correctShare = 40 + std::rand() % 30; // 40-69%
    pct[q.correctIndex] = correctShare;
    remaining -= correctShare;
    std::vector<int> others;
    for (int i = 0; i < 4; i++) {
        if (i == q.correctIndex) continue;
        if (std::find(hidden.begin(), hidden.end(), i) != hidden.end()) continue;
        others.push_back(i);
    }
    for (size_t i = 0; i < others.size(); i++) {
        int share = (i + 1 == others.size()) ? remaining : (std::rand() % (remaining + 1));
        pct[others[i]] = share;
        remaining -= share;
    }
    return pct;
}

// Phone a Friend: simulate a friend suggesting an answer (usually correct).
static int simulatePhoneFriend(const Question& q, const std::vector<int>& hidden) {
    int roll = std::rand() % 100;
    if (roll < 75) return q.correctIndex; // 75% chance friend is right
    std::vector<int> candidates;
    for (int i = 0; i < 4; i++) {
        if (i == q.correctIndex) continue;
        if (std::find(hidden.begin(), hidden.end(), i) != hidden.end()) continue;
        candidates.push_back(i);
    }
    if (candidates.empty()) return q.correctIndex;
    return candidates[std::rand() % candidates.size()];
}

static void playGame() {
    Lifelines life;
    std::string lastSafePrize = "0";

    for (size_t qi = 0; qi < QUESTIONS.size(); qi++) {
        const Question& q = QUESTIONS[qi];
        std::vector<int> hidden; // indices hidden by 50-50

        printDivider();
        std::cout << "Question " << (qi + 1) << " of " << QUESTIONS.size()
                  << "  |  Prize on correct answer: Rs. " << q.prize << "\n";
        printDivider();

        bool answered = false;
        int chosen = -1;

        while (!answered) {
            std::cout << "\n" << q.text << "\n\n";
            static const char labels[4] = {'A', 'B', 'C', 'D'};
            for (int i = 0; i < 4; i++) {
                if (std::find(hidden.begin(), hidden.end(), i) != hidden.end()) continue;
                std::cout << "  " << labels[i] << ") " << q.options[i] << "\n";
            }

            std::cout << "\nLifelines available: "
                      << (life.fiftyFifty ? "[1]50-50 " : "")
                      << (life.askAudience ? "[2]Poll Audience " : "")
                      << (life.phoneFriend ? "[3]Call a Friend " : "") << "\n";
            std::cout << "Enter A/B/C/D to answer, 1/2/3 for a lifeline, Q to quit: ";

            std::string input;
            std::getline(std::cin, input);
            if (input.empty()) continue;
            char c = std::toupper(input[0]);

            if (c == 'Q') {
                std::cout << "\nYou walked away with Rs. " << lastSafePrize << "\n";
                return;
            } else if (c == '1' && life.fiftyFifty) {
                hidden = applyFiftyFifty(q);
                life.fiftyFifty = false;
                std::cout << "\n[50-50 used] Two wrong options removed.\n";
            } else if (c == '2' && life.askAudience) {
                auto pct = simulateAudiencePoll(q, hidden);
                life.askAudience = false;
                std::cout << "\n[Audience Poll Results]\n";
                for (int i = 0; i < 4; i++) {
                    if (std::find(hidden.begin(), hidden.end(), i) != hidden.end()) continue;
                    std::cout << "  " << labels[i] << ": " << pct[i] << "%\n";
                }
            } else if (c == '3' && life.phoneFriend) {
                int suggestion = simulatePhoneFriend(q, hidden);
                life.phoneFriend = false;
                std::cout << "\n[Phone a Friend] Your friend says: \""
                          << "I think it's " << labels[suggestion] << ", \""
                          << q.options[suggestion] << "\"\n";
            } else if (c >= 'A' && c <= 'D') {
                int idx = c - 'A';
                if (std::find(hidden.begin(), hidden.end(), idx) != hidden.end()) {
                    std::cout << "That option was removed by 50-50. Pick another.\n";
                    continue;
                }
                chosen = idx;
                answered = true;
            } else {
                std::cout << "That lifeline is unavailable or input not recognized.\n";
            }
        }

        if (chosen == q.correctIndex) {
            std::cout << "\nCorrect! You win Rs. " << q.prize << "\n";
            if (isSafeLevel(static_cast<int>(qi))) {
                lastSafePrize = q.prize;
                std::cout << "*** Checkpoint reached - Rs. " << q.prize << " is now guaranteed. ***\n";
            }
        } else {
            std::cout << "\nWrong answer! The correct answer was "
                      << static_cast<char>('A' + q.correctIndex) << ") "
                      << q.options[q.correctIndex] << "\n";
            std::cout << "Game over. You leave with Rs. " << lastSafePrize << "\n";
            return;
        }
    }

    std::cout << "\nCongratulations! You answered all questions and won the top prize of Rs. "
              << QUESTIONS.back().prize << "!\n";
}

int main() {
    std::srand(static_cast<unsigned>(std::time(nullptr)));
    printBanner();

    while (true) {
        std::cout << "\n1) Play Game\n2) Exit\n";
        int choice = readMenuChoice("Choose an option: ", 1, 2);
        if (choice == 2) break;
        playGame();
        std::cout << "\n";
    }

    std::cout << "Thanks for playing! (Original game by Jayant Kumar Gandhi, www.jayantgandhi.com)\n";
    return 0;
}