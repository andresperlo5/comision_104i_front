import Carousel from "react-bootstrap/Carousel";
import ImageC from "./ImageC";

const CarouselC = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <ImageC
            urlImage={
              "https://i0.wp.com/elplanetaurbano.com/wp-content/uploads/2020/10/Super-Mario-Bros-1-1280x720-1.jpg?resize=1250%2C720&ssl=1"
            }
            widthImg={"100%"}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ImageC
            urlImage={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPosoOeW78N_OeDbmoXsx0G3Rp8fvNYzjNo6c0ooaRkZdl_emtotdwWB0hZOUa6lgA6xI&usqp=CAU"
            }
            widthImg={"100%"}
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ImageC
            urlImage={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoA0qLWO1uBNSuENLpITTPQH81OZn6ovyFPLFf5hJW4u_B9_F6njAAhe8ZLrebmU8yIjY&usqp=CAU"
            }
            widthImg={"100%"}
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default CarouselC;
