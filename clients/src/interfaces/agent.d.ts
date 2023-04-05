import { BaseKey } from '@pankod/refine-core';

export interface AgentCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    avatar: string,
    noOfProduct: number
    noOfHero: number
    noOfAbout: number
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}
