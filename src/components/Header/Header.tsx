import m from "./Header.module.css"


export const Header = () => {
    return (
        <header className={m.header}>
            <img
                src="https://www.hollywoodreporter.com/wp-content/uploads/2012/12/img_logo_blue.jpg?w=1440&h=810&crop=1"
                alt={"/"}/>
        </header>
    )
}