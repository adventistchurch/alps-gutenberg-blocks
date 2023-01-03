import { Component } from "@wordpress/element";
import cls from "classnames";

export class HighlightBlocksSaveComponent extends Component {
	render() {
		const { attributes } = this.props;

		const styles = cls(
			"c-section c-section__highlight-blocks c-highlight-blocks u-theme--background-color--base u-color--white u-spacing"
		);

		const btnText = attributes.buttonText
			? attributes.buttonText
			: "Learn More";

		const btnTarget = attributes.buttonNewWindow ? "_blank" : "_self";

		// Block Conditions
		let blocks = "";
		let blocks1 = "";
		let blocks2 = "";
		let blocks3 = "";

		if (attributes.body1 || attributes.body || attributes.body3) {
			if (attributes.body1) {
				blocks1 = (
					<div className="c-highlight-blocks__content-item">
						<div className="o-number u-font--secondary--xxl">1</div>
						<p className="u-font--secondary--m">{attributes.body1}</p>
					</div>
				);
			}
			if (attributes.body2) {
				blocks2 = (
					<div className="c-highlight-blocks__content-item">
						<div className="o-number u-font--secondary--xxl">2</div>
						<p className="u-font--secondary--m">{attributes.body2}</p>
					</div>
				);
			}
			if (attributes.body3) {
				blocks3 = (
					<div className="c-highlight-blocks__content-item">
						<div className="o-number u-font--secondary--xxl">3</div>
						<p className="u-font--secondary--m">{attributes.body3}</p>
					</div>
				);
			}
			blocks = (
				<div className="c-highlight-blocks__content">
					{blocks1}
					{blocks2}
					{blocks3}
				</div>
			);
		}

		return (
			<div>
				<div className={styles}>
					{blocks}
					<a
						href={attributes.buttonUrl}
						target={btnTarget}
						className="o-button o-button--white"
						rel="noopener"
					>
						<span className="u-icon u-icon--xs u-space--half--right">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
								<title>o-arrow__short--right</title>
								<path
									d="M5,.09,3.62,1.5,6.12,4H.05V6H6.12L3.62,8.5,5,9.91,10,5Z"
									fill="#9b9b9b"
								></path>
							</svg>
						</span>
						{btnText}
					</a>
				</div>
			</div>
		);
	}
}
