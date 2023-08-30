import {useRef} from "react";
import config from "../../shared/config.json"

interface ColorSelectorProps {
    onSelected: (color: string) => void
}

function RgbColorSelector(props: ColorSelectorProps) {
    const colors = config.tradfri.colors.rgb

    const colorSelector = useRef(null);
    const openCustomSelector = () => {
        (colorSelector.current as any).click();
    }

    return (
        <div>
            {colors.map(c => <button onClick={() => props.onSelected(c)} style={{backgroundColor: c}}
                                     key={c}>{c}</button>)}
            <button onClick={openCustomSelector}>custom</button>
            <input type="color" ref={colorSelector} onChange={e => props.onSelected(e.target.value)}/>
        </div>
    )
}

export default RgbColorSelector
