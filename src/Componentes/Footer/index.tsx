import React from "react";
import style from "./style.module.css";


function Footer() {
    return (
        <>
            <footer className={style.footer}>
                <div className={style.footerContent}>
                    <div className={style.footerText}>
                        <p>Desenvolvido por @Marcos Amaral</p>
                    </div>
                    <div className={style.footerSocial}>
                        <a href="https://www.linkedin.com/in/marcos-do-amaral-90b941224/" target="_blank"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a>
                        <a href="https://github.com/LivramentoAmaral" target="_blank"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
                        <a href="https://www.instagram.com/marcos_amaral2002/" target="_blank"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;