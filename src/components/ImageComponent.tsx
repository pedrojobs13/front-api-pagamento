export async function ImageComponent() {
	return (
		<img
			src={`${process.env.NEXT_PUBLIC_IMAGE}`}
			alt="Image"
			className="object-cover h-screen size-4/12 aspect-auto"
		/>
	);
}
