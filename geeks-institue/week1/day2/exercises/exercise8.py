# Star Wars quiz data
data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"},
]


def play_quiz():
    correct_count = 0
    wrong_count = 0
    wrong_answers = []

    for item in data:
        user_answer = input(item["question"] + " ").strip()

        if user_answer.lower() == item["answer"].lower():
            print("✅ Correct!\n")
            correct_count += 1
        else:
            print(f"❌ Wrong! The correct answer is: {item['answer']}\n")
            wrong_count += 1
            wrong_answers.append(
                {
                    "question": item["question"],
                    "your_answer": user_answer,
                    "correct_answer": item["answer"],
                }
            )

    return correct_count, wrong_count, wrong_answers


def show_results(correct_count, wrong_count, wrong_answers):
    print("\n Quiz Results ")
    print(f" Correct Answers: {correct_count}")
    print(f" Incorrect Answers: {wrong_count}")

    if wrong_count > 0:
        print("\n--- Incorrect Answers Recap ---")
        for w in wrong_answers:
            print(f"Q: {w['question']}")
            print(f"   Your Answer: {w['your_answer']}")
            print(f"   Correct Answer: {w['correct_answer']}\n")

    if wrong_count > 3:
        print("You had more than 3 wrong answers. Let's try again!\n")
        return True  # Ask to replay
    else:
        print("Great job! You know your Star Wars facts well!")
        return False


while True:
    correct, wrong, wrong_list = play_quiz()
    replay = show_results(correct, wrong, wrong_list)
    if not replay:
        break
