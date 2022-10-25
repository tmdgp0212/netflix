import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  font-size: 14px;
  z-index: 1000;

  > .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1920px;
    height: 80px;
    margin: 0 auto;
    padding: 0 50px;
  }
`;

const Col = styled.div`
  display: flex;
`;

const Logo = styled(motion.svg)`
  width: 92px;
  height: 80px;
  margin-right: 50px;
  align-items: center;

  > path {
    stroke-width: 8px;
    stroke: #e51013;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  position: relative;
  margin-right: 20px;

  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: -8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
  border-radius: 50%;
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  color: inherit;
  font-size: 16px;
  cursor: pointer;

  > span {
    display: flex;
    align-items: center;

    z-index: 100;
  }
`;

const Input = styled(motion.input)`
  border: none;
  outline: none;
  background: none;

  position: absolute;
  right: -0;
  height: 30px;
  padding-left: 32px;
  color: ${(props) => props.theme.white.lighter};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
  transform-origin: right center;

  &::placeholder {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0.3, 1],
  },
  transition: 0.5,
};

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const searchMatch = useMatch("/search");
  const keywordMatch = useMatch("/search/:keyword");

  const navAnimation = useAnimation();
  const history = useNavigate();

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (keyword === "") return;
    history(`/search/${keyword}`);
    setKeyword("");
  };

  const onChange = (e) => {
    setKeyword(e.currentTarget.value);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 100) {
        navAnimation.start({
          backgroundColor: "rgba(0, 0, 0, 1)",
        });
      } else {
        navAnimation.start({
          backgroundColor: "rgba(0, 0, 0, 0)",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0))",
        });
      }
    });
  }, []);
  const { scrollY } = useScroll();
  return (
    <Nav
      initial={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0))",
      }}
      animate={navAnimation}
    >
      <div className="container">
        <Col>
          <Logo
            variants={logoVariants}
            whileHover={"active"}
            initial="normal"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 276.742"
            onClick={() => history("/")}
          >
            <motion.path
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
              fill="#d81f26"
            />
          </Logo>
          <Items>
            <Item>
              <Link to={"/"}>
                홈 {homeMatch && <Circle layoutId="circle" />}
              </Link>
            </Item>
            <Item>
              <Link to={"/tv"}>
                TV프로그램 {tvMatch && <Circle layoutId="circle" />}
              </Link>
            </Item>
            <Item>
              <Link to={"/search"}>
                Search{" "}
                {searchMatch || keywordMatch ? (
                  <Circle layoutId="circle" />
                ) : null}
              </Link>
            </Item>
          </Items>
        </Col>
        <Col>
          <Search onSubmit={(e) => onSubmit(e)}>
            <motion.span
              animate={{ x: searchOpen ? -175 : 0 }}
              transition={{ type: "linear" }}
            >
              <FaSearch onClick={toggleSearch} />
            </motion.span>
            <Input
              animate={{ scaleX: searchOpen ? 1 : 0 }}
              transition={{ type: "linear" }}
              placeholder="Search for movie or tv show"
              value={keyword}
              onChange={onChange}
            ></Input>
          </Search>
        </Col>
      </div>
    </Nav>
  );
};

export default Header;
