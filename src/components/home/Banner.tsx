// components/Banner.jsx
function Banner() {
    return (
      <img
        alt="Banner"
        className="w-full object-cover md:rounded-lg md:shadow-lg md:object-cover md:object-center mt-8"
        height="200"
        src="https://images.tcdn.com.br/img/img_prod/1049260/1711972478_bannerdesk.jpg"
        style={{ aspectRatio: "800/200", objectFit: "cover" }}
        width="800"
      />
    );
  }
  
  export default Banner;
  