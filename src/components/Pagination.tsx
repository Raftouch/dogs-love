import { getPages } from "../utils/page";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  resultsPerPage: number;
  totalResults: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export default function Pagination({
  page,
  totalPages,
  onNext,
  onPrev,
  setCurrentPage,
  currentPage,
}: PaginationProps) {
  const pages = getPages(page, totalPages);

  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={onPrev}>
        Prev
      </button>

      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index}>...</span>
        ) : (
          <button
            className={p === currentPage ? styles.active : ""}
            key={index}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        )
      )}

      <button disabled={page === totalPages} onClick={onNext}>
        Next
      </button>
    </div>
  );
}
