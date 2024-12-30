function RatingDynamic({ rating }) {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 !== 0; // Half star logic (if required)
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining stars

    return (
        <div>
            {/* Full Stars */}
            {[...Array(fullStars)].map((_, index) => (
                <span key={index} className="bi bi-star-fill" style={{ color: 'gold' }}></span>
            ))}

            {/* Half Star (if applicable) */}
            {halfStar && <span className="bi bi-star-half" style={{ color: 'gold' }}></span>}

            {/* Empty Stars */}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={index} className="bi bi-star" style={{ color: 'gray' }}></span>
            ))}
        </div>
    );
}

export default RatingDynamic;