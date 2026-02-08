"use client"

import {TradfriApiGroup} from "@/types/Tradfri";
import {togglePlug} from "@/actions/tradfri-actions";
import {ListLayout} from "@/components/layout/Layouts";
import Link from "next/link";
import styles from "./PageContent.module.css"
import {cns} from "@/utils/cns";
import {Icon} from "@/components/icon/Icon";
import {useRouter} from "next/navigation";

export function TradfriPageContent(props: { groups: Array<TradfriApiGroup> }) {
    const router = useRouter()

    function LinkButton(p: {
        href?: string,
        onClick?: () => void
        active: boolean,
        name: string
        status: string
        icon: string,
        iconActiveColor?: string

    }) {
        return <Link
            href={p.href ?? '#'}
            onClick={p.onClick}
            className={cns(styles.link, p.active ? styles.active : undefined)}
        >
            <div className={styles.text}>
                <strong>{p.name}</strong>
                <span>{p.status}</span>
            </div>
            <div className={styles.iconContainer} style={{'--active-color': p.iconActiveColor} as any}>
                <Icon icon={p.icon}/>
            </div>
        </Link>
    }

    function TradfriButtonGroup({group}: { group: TradfriApiGroup }) {
        return <ListLayout>
            <h1>{group.name}</h1>
            <div className={styles.linkGroup}>
                {
                    [
                        ...group.lights.map((l) => ({
                            name: l.name,
                            component: <LinkButton
                                key={l.name}
                                href={`/tradfri/lights/${l.id}`}
                                name={l.name}
                                status={l.brightness > 0 ? (`${Math.floor(100 * l.brightness)}%`) : 'off'}
                                icon="lightbulb_2"
                                active={l.brightness > 0}
                                iconActiveColor={`#${l.color}`}
                            />
                        })),
                        ...group.plugs.map((p) => ({
                            name: p.name,
                            component: <LinkButton
                                key={p.name}
                                onClick={() => togglePlug(p.id).then(router.refresh)}
                                name={p.name}
                                status={p.isOn ? 'on' : 'off'}
                                icon="power"
                                active={p.isOn}
                            />

                        }))
                    ]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((x) => x.component)
                }
            </div>
        </ListLayout>
    }

    return <ListLayout largeGap animated>
        {props.groups.map(g => <TradfriButtonGroup group={g} key={g.id}/>)}
    </ListLayout>
}