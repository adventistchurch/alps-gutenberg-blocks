import { Component } from "@wordpress/element";
import cls from "classnames";

export class ContentStepSaveComponent extends Component {
	render() {
		const { attributes } = this.props;

		const btnText = attributes.buttonText
			? attributes.buttonText
			: "Learn More";

		const btnTarget = attributes.buttonNewWindow ? "_blank" : "_self";

		// Block Conditions
		let steps = "";
		let step1 = "";
		let step2 = "";
		let step3 = "";

		if (
			attributes.stepKicker ||
			attributes.stepText ||
			attributes.stepKicker2 ||
			attributes.stepText2 ||
			attributes.stepKicker3 ||
			attributes.stepText3
		) {
			if (attributes.stepKicker || attributes.stepText) {
				step1 = (
					<div class="c-step-blocks__item u-theme--background-color--base u-color--white u-padding">
						<span class="o-kicker">{attributes.stepKicker}</span>
						<p>
							<strong>{attributes.stepText}</strong>
						</p>
					</div>
				);
			}
			if (attributes.stepKicker2 || attributes.stepText2) {
				step2 = (
					<div class="c-step-blocks__item u-theme--background-color--base u-color--white u-padding">
						<span class="o-kicker">{attributes.stepKicker2}</span>
						<p>
							<strong>{attributes.stepText2}</strong>
						</p>
					</div>
				);
			}
			if (attributes.stepKicker3 || attributes.stepText3) {
				step3 = (
					<div class="c-step-blocks__item u-theme--background-color--base u-color--white u-padding">
						<span class="o-kicker">{attributes.stepKicker3}</span>
						<p>
							<strong>{attributes.stepText3}</strong>
						</p>
					</div>
				);
			}
			steps = (
				<div className="c-step-blocks">
					{step1}
					{step2}
					{step3}
				</div>
			);
		}

		return (
			<div class="c-article__body u-spacing--double">
				<div class="c-home-body-content u-spacing u-theme--border-color--base text">
					<img class="content-step__image" src={attributes.imageURL} />
					<p>{attributes.body}</p>
					{steps}
					<a
						href={attributes.buttonUrl}
						className="o-button o-button--primary"
						target={btnTarget}
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
