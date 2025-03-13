"use client"

import PrimaryButton from "@/components/buttons/primary-button/PrimaryButton";
import {Icon} from "@/components/icon/Icon";
import styles from "./BackButton.module.scss";
import {useRouter} from "next/navigation";

export function BackButton() {
    const router = useRouter();
    return <PrimaryButton onClick={() => router.push('/')} className={styles.backButton}>
        <Icon icon="arrow_back"/>
        <div>back</div>
    </PrimaryButton>
}