function Loading() {
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <span className="loading-circle anim-loading"></span>
      <span className="loading-circle anim-loading delay-100"></span>
      <span className="loading-circle anim-loading delay-200"></span>
    </div>
  );
}

export default Loading;
