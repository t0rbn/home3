import {useRef} from "react";
import config from "../../../shared/config.json";
import PrimaryButton from "../../../globals/buttons/primary-button/PrimaryButton";
import ColorButton from "../color-button/ColorButton";
import ContentGridLayout from "../../../globals/layouts/content-grid-layout/ContentGridLayout";
import FaIcon from "../../../globals/fa-icon/FaIcon";

interface ColorSelectorProps {
    onSelected: (color: string) => void
}

function RgbColorSelector(props: ColorSelectorProps) {
    const colors = config.tradfri.colors.rgb

    const colorSelector = useRef(null);
    const openCustomSelector = () => {
        (colorSelector.current as any).click();
    }

    const randomColor = () => {
        const charSet = '1234567890ABCDEF'
        const color = '#' + new Array(6).fill('').map( () => charSet[Math.floor(charSet.length * Math.random())]).join('')
        props.onSelected(color)
        return
    }

    return (
        <div>
            <ContentGridLayout variant="small-items">
                {colors.map(c => <ColorButton onClick={() => props.onSelected(c)} key={c} color={c}/>)}
                <PrimaryButton onClick={randomColor}><FaIcon icon="dice" /></PrimaryButton>
                <PrimaryButton onClick={openCustomSelector}><FaIcon icon="palette" /></PrimaryButton>
            </ContentGridLayout>
            <input type="color" ref={colorSelector} onChange={e => props.onSelected(e.target.value)} style={{display: 'none'}}/>
        </div>
    )
}

export default RgbColorSelector
