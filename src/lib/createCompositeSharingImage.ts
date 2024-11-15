import { Cloudinary } from "@cloudinary/url-gen"
import { fill } from "@cloudinary/url-gen/actions/resize"
import { source, Overlay } from "@cloudinary/url-gen/actions/overlay"
import { Transformation } from "@cloudinary/url-gen"
import { scale } from "@cloudinary/url-gen/actions/resize"
import { byRadius, max } from "@cloudinary/url-gen/actions/roundCorners"
import { video, image, text } from "@cloudinary/url-gen/qualifiers/source"
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle"
import { Position } from "@cloudinary/url-gen/qualifiers/position"
import { compass } from "@cloudinary/url-gen/qualifiers/gravity"
import { byAngle } from "@cloudinary/url-gen/actions/rotate"

interface Props {
	cloudName: string
	cloudinaryImage: any
	overlayText: string
}

export const createCompositeSharingImage = ({ cloudName, overlayText, cloudinaryImage }: Props) => {
	const cloudinary = new Cloudinary({
		cloud: {
			cloudName,
		},
	})


	let ogImage = cloudinary.image("joelvartydotcom/jv-og-bg.png")

	ogImage
		.overlay(
			source(text(overlayText, new TextStyle("Muli", 60).fontWeight("bold")).textColor("#fff")).position(
				new Position().gravity(compass("north")).offsetY(50)
			)
		)
		.overlay(
			source(
				image(cloudinaryImage.public_id).transformation(
					new Transformation().resize(scale().height(500).width(1200)).roundCorners(byRadius(60))
				)
			).position(new Position().gravity(compass("center")).offsetY(-50))
		)

	return ogImage.toURL()
}