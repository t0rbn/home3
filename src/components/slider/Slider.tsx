import styles from "./Slider.module.scss"

interface SliderProps {
    min?: number;
    max?: number;
    value: number;
    step?: number;
    onChange: (val: number) => void;
}

export default function Slider(props: SliderProps) {
    const handleChange = (e: any) => {
        props.onChange(Number.parseFloat(e.currentTarget.value))
    }

    return <div className={styles.wrapper}>
        <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={handleChange}
        value={props.value}
        className={styles.slider}
    />
    </div>
}