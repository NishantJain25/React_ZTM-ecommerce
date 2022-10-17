import styled from "styled-components"
import { Link } from "react-router-dom"

//To-do: convert back to normal scss

export const NavigationContainer = styled.div`
	height: 70px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;
	padding: 0px;
`

export const LogoContainer = styled(Link)`
	height: 100%;
	width: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
`
export const NavLinksContainer = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`

export const NavLink = styled(Link)`
	padding: 10px 15px;
	cursor: pointer;
`
/* .navigation {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding: 0px ;

  .logo-container {
    height: 100%;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-links-container {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .nav-link {
      padding: 10px 15px;
      cursor: pointer;
    }
  }
} */
