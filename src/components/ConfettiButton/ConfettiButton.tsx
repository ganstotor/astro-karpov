import { $counter, increaseCounter } from "../../stores/CounterStore";
import { useState } from "react";
import styles from "./style.module.css";

export const ConfettiButton = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [ConfettiComponent, setConfettiComponent] = useState<any>(null);

  const handleClick = async () => {
    // 1. Если компонент еще не загружен — загружаем его прямо сейчас
    if (!ConfettiComponent) {
      const mod = await import("react-confetti-explosion");
      setConfettiComponent(() => mod.default);
    }

    // 2. Триггерим взрыв
    setIsExploding(false);
    setTimeout(() => {
      setIsExploding(true);
    }, 10);

    // 3. Увеличиваем счетчик
    increaseCounter();
  };

  return (
    <div className={styles.container}>
      {/* Конфетти рендерится только ПОСЛЕ успешного импорта и клика */}
      {isExploding && ConfettiComponent && (
        <ConfettiComponent
          force={0.6}
          duration={3000}
          particleCount={200}
          width={1600}
        />
      )}

      <div className={styles.counter}>{$counter.get()}</div>

      <button className={styles.confettiButton} onClick={handleClick}>
        I have read
      </button>
    </div>
  );
};
