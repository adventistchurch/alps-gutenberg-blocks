import { Component } from "@wordpress/element";
import cls from "classnames";

export class ContentShowMoreSaveComponent extends Component {
	render() {
		const { attributes } = this.props;

		const styles = cls(
			"c-block c-content-read-more c-block__text u-theme--border-color--darker u-border--left c-block__text-expand u-spacing u-background-color--gray--light u-padding u-clear-fix can-be--dark-dark",
			{ "has-image": attributes.imageURL }
		);

		return (
			<div>
				<div className={styles}>
					{attributes.imageURL && (
						<img className="c-block__image" src={`${attributes.imageURL}`} />
					)}
					<h3 className="u-theme--color--darker u-font--primary--m">
						<strong>{attributes.title}</strong>
					</h3>
					<p
						className="c-block__body text o-description"
						style={{ textAlign: attributes.alignment }}
					>
						{attributes.description}
					</p>
					<p
						className="o-paragraph"
						style={{ textAlign: attributes.alignment }}
					>
						{attributes.body}
					</p>
					<a className="o-button o-button--outline o-button--expand js-toggle-parent"></a>
				</div>
			</div>
		);
	}
}
