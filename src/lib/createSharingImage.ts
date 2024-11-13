interface Props {
	cloudName: string
	text: string
}

/**
 * Dynamically generate the og:image for sharing using the title and a base image with cloudinary.
 * Hats off to Matías Hernández Arellano for sharing this: https://gist.github.com/matiasfha/27fc927bfcc63416e2602aedbf73f423
 * @param param0
 * @returns
 */
export const createSharingImage = ({ cloudName, text }: Props) => {
	const imageTransformations = [
		'w_1600',
		'h_900',
		'c_fill',
		'q_auto',
		'f_auto'
	].join(',')
	const textTransformations = [
		'w_1600',
		'c_fit',
		'g_center',
		'co_white',
		`l_text:muli_96_center:${encodeURIComponent(text).replaceAll("%2C", "%E2%80%9A")}`
	].join(',')

	const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`
	return `${baseUrl}${imageTransformations}/${textTransformations}/joelvartydotcom/og-bg.png`
}