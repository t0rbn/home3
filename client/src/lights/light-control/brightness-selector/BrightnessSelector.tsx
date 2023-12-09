import SegmentedButton from "./segmented-button/SegmentedButton";
import PrimaryButton from "../../../globals/buttons/primary-button/PrimaryButton";
import MaterialIcon from "../../../globals/material-icon/MaterialIcon";
import styles from "./brightness-selector.module.css"

interface BrightnessSelectorProps {
    current: number
    onSelected: (value: number) => void;
}

function BrightnessSelector(props: BrightnessSelectorProps) {

    const buttons = [0.01, 0.25, 0.5, 0.75, 1]
        .map(v => ({
            label: '',
            onClick: () => props.onSelected(v),
            isActive: Math.round(100 * props.current) >= (100 * v)
        }))

    return (
        <div className={styles.brightnessSelector}>
            <PrimaryButton onClick={() => props.onSelected(0)}><MaterialIcon icon="mode_off_on"/></PrimaryButton>
            <SegmentedButton buttons={buttons}/>
        </div>
    )

}

export default BrightnessSelector;
