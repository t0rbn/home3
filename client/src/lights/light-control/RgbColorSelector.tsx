import './ColorSelector.scss'
import PrimaryButton from "../../../globals/PrimaryButton/PrimaryButton";
import {useRef} from "react";
import GridLayout from "../../../globals/layouts/Grid/GridLayout";

interface ColorSelectorProps {
    colors: string[]
    onColorSelected: (color: string) => void
    allowCustomHexColor?: boolean;
}

function ColorSelector(props: ColorSelectorProps) {
    const colorSelector = useRef(null);

    const openCustomSelector = () => {
        (colorSelector.current as any).click();
    }

    return (
        <div className="color-selector">
            <GridLayout cols={4}>
                {props.colors.map(c => <PrimaryButton className="color-selector-button" onClick={() => props.onColorSelected(c)} style={{backgroundColor: c}} key={c}>&nbsp;</PrimaryButton>)}
                {props.allowCustomHexColor && (<PrimaryButton onClick={openCustomSelector} type="double"><i className="fas fa-palette"></i></PrimaryButton>)}
                <input type="color" ref={colorSelector} onChange={e => props.onColorSelected(e.target.value)}/>
            </GridLayout>

        </div>
    )
}

ColorSelector.defaultProps = {
    allowCustomHexColor: false
}

export default ColorSelector
