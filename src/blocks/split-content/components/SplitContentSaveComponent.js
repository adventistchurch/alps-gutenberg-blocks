import { Component } from "@wordpress/element";
import cls from "classnames";

export class SplitContentSaveComponent extends Component {
	render() {
		const { attributes } = this.props;

		const btnText = attributes.buttonText
			? attributes.buttonText
			: "Learn More";

		const btnTarget = attributes.buttonNewWindow ? "_blank" : "_self";

		return (
			<div>
				<article className="c-article l-grid-item l-grid-item--l--4-col l-grid-item--xl--3-col">
					<div className="c-article__body u-spacing--double">
						<div className="c-split-highlight-content">
							<div className="c-split-highlight-content--left u-theme--background-color--base u-color--white u-padding">
								<span className="u-font--primary--l">
									{attributes.bodyLeft}
								</span>
							</div>

							<div className="c-split-highlight-content--right u-background-color--gray--light u-padding u-spacing text">
								<img class="split-content__image" src={attributes.imageURL} />
								<p>{attributes.bodyRight}</p>
								<a
									href={attributes.buttonUrl}
									className="o-button o-button--primary"
									target={btnTarget}
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
					</div>
				</article>
			</div>
		);
	}
}
