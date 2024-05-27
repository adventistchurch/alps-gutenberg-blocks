import { Component } from "@wordpress/element";
import cls from "classnames";

export class ContentReadMoreSaveComponent extends Component {
	render() {
		const { attributes } = this.props;

		const styles = cls(
			"c-block c-content-read-more c-block__text u-theme--border-color--darker u-border--left c-block__text-expand u-spacing u-padding u-clear-fix can-be--dark-dark"
		);

		return (
			<div>
				<div className={styles}>
					<p
						className="o-paragraph"
						style={{ textAlign: attributes.alignment }}
					>
						{attributes.body}
					</p>
					<button className="o-button o-button--outline js-toggle-parent">
						<span className="u-icon u-icon--xs u-space--half--right">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.01 10">
								<title>o-cion</title>
								<path
									d="M10,2.31H0V0H10ZM6.36,3.85H0v2.3H6.36ZM8.22,7.7H0V10H8.22Z"
									fill="#231f20"
								></path>
							</svg>
						</span>
						<font>Read More</font>
					</button>
				</div>
			</div>
		);
	}
}
