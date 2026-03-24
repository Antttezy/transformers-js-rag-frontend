import styles from './LoadingStatus.module.css';

type Props = {
    progress: number;
    loading: boolean;
};

export default function LoadingStatus({ progress, loading }: Props) {
    if (!loading) return null;

    return (
        <div className={styles.container}>
            <div className={styles.label}>
                Загрузка модели: {Math.round(progress)}%
            </div>

            <div className={styles.bar}>
                <div
                    className={styles.fill}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
