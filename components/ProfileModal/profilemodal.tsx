import React from "react";
import styles from "./profilemodal.module.scss"; // Import your custom styles here
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}

export default function ProfileModal({ isOpen, onClose, points }: ProfileModalProps) {
  const { data: session } = useSession();

  //if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className={styles.profileCard}>
          <img
            src={session?.user?.image || "/default-profile.png"} // Fallback image
            alt="Profile Picture"
            className={styles.profileImage}
          />
          <h2 className={styles.userName}>{session?.user?.name || "User"}</h2>
          <p className={styles.points}>Points: {points}</p>
        </div>
      </div>
    </div>
  );
}
