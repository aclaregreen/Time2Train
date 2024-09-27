def calculateMax(weight, reps, rpe):
    weight = float(weight)
    reps = int(reps)
    rpe = int(rpe)
    rir = 10 - rpe
    adjFactor = 1 + (reps - rir) / 30
    oneRM = round(weight * adjFactor)
    return oneRM

def main():
    w = input("Enter your weight: ")
    rep = input("Enter your reps: ")
    rpe = input("Enter your rpe: ")
    print(calculateMax(w, rep, rpe))
    print("Done")

if __name__ == "__main__":
    main()