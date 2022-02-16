export default function RateLimitReachedAlert(props) {
  if (!props.rateLimitReached) {
    return null;
  }

  return (
    <div className="RateLimitReachedAlert">
      <p>Rate limit reached! Using mock data.</p>
    </div>
  );
}