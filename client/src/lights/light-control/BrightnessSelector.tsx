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
        <div>
            <button onClick={() => props.onSelected(currentValue === 0 ? 0.01 : 0)}>ON/OFF</button>
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
