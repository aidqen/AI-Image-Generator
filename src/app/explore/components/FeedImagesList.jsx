import { FeedImagePreview } from "./FeedImagePreview";

export function FeedImageList({ images }) {

    return <div className="columns-2 rounded-t-3xl overflow-hidden md:columns-3 lg:columns-4 rounded-lg gap-[0.5px] space-y-[0.5px] w-full">
    {images.map((image, idx) => (
        <FeedImagePreview key={image.id} image={image} idx={idx} />
    ))}
</div>
}