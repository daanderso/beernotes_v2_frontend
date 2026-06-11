import React from "react";
import styles from "./StarRating.module.css";

interface StarRatingProps {
  value?: number | null;
  onChange?: (rating: number | null) => void;
  readOnly?: boolean;
  maxStars?: number;
}

function StarRating({
  value = null,
  onChange,
  readOnly = false,
  maxStars = 5,
}: StarRatingProps): React.ReactElement {
  const stars = Array.from({ length: maxStars }, (_, i) => i + 1);

  const handleStarClick = (star: number) => {
    if (readOnly || !onChange) {
      return;
    }
    onChange(value === star ? null : star);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    star: number,
  ) => {
    if (readOnly || !onChange) {
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(value === star ? null : star);
    }
  };

  if (readOnly && (value == null || value < 1)) {
    return <span className={styles.noRating}>—</span>;
  }

  return (
    <div
      className={styles.starRating}
      role="radiogroup"
      aria-label={readOnly ? `Rating: ${value ?? "none"} out of ${maxStars}` : "Beer rating"}
    >
      {stars.map((star) => {
        const filled = value != null && star <= value;
        const starClass = [
          styles.star,
          filled ? styles.starFilled : "",
          readOnly ? styles.starReadOnly : "",
        ]
          .filter(Boolean)
          .join(" ");

        if (readOnly) {
          return (
            <span
              key={star}
              className={starClass}
              aria-hidden="true"
            >
              ★
            </span>
          );
        }

        return (
          <button
            key={star}
            type="button"
            className={starClass}
            aria-label={`Rate ${star} stars`}
            aria-checked={value === star}
            role="radio"
            onClick={() => handleStarClick(star)}
            onKeyDown={(e) => handleKeyDown(e, star)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
