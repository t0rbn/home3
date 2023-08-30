import {useEffect, useState} from "react";
import config from "../../shared/config.json"

interface WhiteTemperatureSelectorProps {
    onSelected: (value: number) => void
    current: number
}


export default function WhiteTemperatureSelector(props: WhiteTemperatureSelectorProps) {
    const predefinedValues = config.tradfri.colors.whiteTemperatures.map((c, i) => ({color: c, value: (i / (config.tradfri.colors.whiteTemperatures.length - 1))}))

    const [currentValue, setCurrentValue] = useState(props.current * 100);

    useEffect(() => {
        setCurrentValue(props.current * 100)
    }, [props.current])

    const submitValue = () => {
        props.onSelected(currentValue / 100)
    }

    return (
        <div>
            {predefinedValues.map(colorValue => (<button key={colorValue.color} onClick={() => props.onSelected(colorValue.value)}>{colorValue.color}</button> ))}

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