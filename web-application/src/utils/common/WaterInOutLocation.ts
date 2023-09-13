export const getWaterInOutEnumNumber = (
    waterIncomingLocation: string
): number => {
    if (waterIncomingLocation === 'top') return 3
    if (waterIncomingLocation === 'bottom') return 4
    if (waterIncomingLocation === 'left') return 1
    if (waterIncomingLocation === 'right') return 2
    return 0
}

export const getWaterOutLocationByIn = (waterIn: string): string => {
    if (waterIn === 'top') return 'bottom-64a7f344a37c4b77fce8810c'
    if (waterIn === 'bottom') return 'top-64a7f344a37c4b77fce8810a'
    if (waterIn === 'left') return 'right-64a7f344a37c4b77fce8810b'
    if (waterIn === 'right') return 'left-64a7f344a37c4b77fce88109'
    return ''
}
