import {useEffect, useState} from "react";
import styles from './brightness-selector.module.css'

interface BrightnessSelectorProps {
    current: number;
    onSelected: (value: number) => void;
}

function BrightnessSelector(props: BrightnessSelectorProps) {
    const [currentValue, setCurrentValue] = useState(props.current * 100);

    useEffect(() => {
        setCurrentValue(props.current * 100)
    }, [props])

    const submitValue = () => {
        props.onSelected(currentValue / 100)
    }

    return (
        <div className={styles.brightnessSelector}>
            {/*<PrimaryButton onClick={() => props.onSelected(currentValue === 0 ? 0.01 : 0)}><FaIcon icon="power-off"></FaIcon></PrimaryButton>*/}
            <input
                type="range"
                min="0"
                max="100"
                value={currentValue}
                onChange={(e: any) => setCurrentValue(e.target.value)}
                onMouseUp={submitValue}
                onTouchEnd={submitValue}
            />
        </div>
    )

}

export default BrightnessSelector;
