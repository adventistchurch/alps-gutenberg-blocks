import { Component } from "@wordpress/element";
import icons from "../../../icons/icons";
import { Icon } from "@wordpress/components";
import cls from "classnames";

export class HighlightBlocksSaveComponent extends Component {
	render() {
		const { attributes } = this.props;

		const styles = cls(
			"c-section c-section__highlight-blocks c-highlight-blocks u-theme--background-color--base u-color--white u-spacing"
		);

		const btnText = attributes.button1Text
			? attributes.button1Text
			: "Learn More";

		return (
			<div>
				<div className={styles}>
					<div class="c-highlight-blocks__content">
						<div class="c-highlight-blocks__content-item">
							<div class="o-number u-font--secondary--xxl">1</div>
							<p class="u-font--secondary--m">{attributes.body1}</p>
						</div>
						<div class="c-highlight-blocks__content-item">
							<div class="o-number u-font--secondary--xxl">2</div>
							<p class="u-font--secondary--m">{attributes.body2}</p>
						</div>
						<div class="c-highlight-blocks__content-item">
							<div class="o-number u-font--secondary--xxl">3</div>
							<p class="u-font--secondary--m">{attributes.body3}</p>
						</div>
					</div>
					<a href={attributes.button1Url} class="o-button o-button--white">
						<span class="u-icon u-icon--xs u-space--half--right">
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
