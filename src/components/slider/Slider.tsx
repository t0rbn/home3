import styles from "./Slider.module.scss"

interface SliderProps {
    min?: number;
    max?: number;
    value: number;
    step?: number;
    onChange: (val: number) => void;
}

export default function Slider(props: SliderProps) {
    return <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        onInput={e => props.onChange(Number.parseFloat(e.currentTarget.value))}
        value={props.value}
        className={styles.slider}
    />
}