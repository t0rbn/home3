import './BrightnessSelector.scss'
import PrimaryButton from "../../../globals/PrimaryButton/PrimaryButton";
import {useEffect, useState} from "react";

interface BrightnessSelectorProps {
    current: number;
    onSelected: (value: number) => void;
}

function BrightnessSelector(props: BrightnessSelectorProps) {
    const [currentValue, setCurrentValue] = useState(props.current * 100);

    useEffect(() => {
        setCurrentValue(props.current * 100)
    }, [props.current])

    const submitValue = () => {
        props.onSelected(currentValue / 100)
    }

    return (
        <div className="brightness-selector">
            <PrimaryButton type="double" onClick={() => props.onSelected(currentValue === 0 ? 0.01 : 0)}><i className="fa-solid fa-power-off power-icon"></i></PrimaryButton>
            <input
                type="range"
                min="1"
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
