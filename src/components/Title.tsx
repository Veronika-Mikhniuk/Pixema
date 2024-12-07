import { ITitleProps } from '@/types/ITitleProps'
import '@/styles/title.scss'

export function Title({ primary, secondary, tertiary, children }: ITitleProps) {
    let titleClass = 'title'

    if (primary) titleClass += ' title_primary'
    if (secondary) titleClass += ' title_secondary'
    if (tertiary) titleClass += ' title_tertiary'

    if (!primary && !secondary && !tertiary) {
        titleClass += ' title_primary'
    }

    return (
        <h1 className={titleClass}>
            {children}
        </h1>
    )
}