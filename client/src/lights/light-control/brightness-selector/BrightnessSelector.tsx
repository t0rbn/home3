import {useEffect, useState} from "react";
import PrimaryButton from "../../../globals/primary-button/PrimaryButton";

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
        <div>
            <PrimaryButton onClick={() => props.onSelected(currentValue === 0 ? 0.01 : 0)}>ON/OFF</PrimaryButton>
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
