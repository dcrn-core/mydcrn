import { FormattedMessage as T } from "react-intl";
import { HelpLink, HelpLinkInfoModal, HelpLinkAboutModal } from "buttons";
import { DescriptionHeader } from "layout";
import { Subtitle, Documentation } from "shared";
import "style/Help.less";

export const LinksTabHeader = () =>
  <DescriptionHeader
    description={<T id="help.description.links" m="If you have any difficulty with MyDcrn, please use the following links to help find a solution." />}
  />;

export const LinksTab = () => (
  <>
    <Subtitle title={<T id="help.subtitle.project" m="Project Related"/>} />
    <div className="help-icons-list">
      <HelpLink className={"help-docs-icon"} href="https://dcrn.xyz/help/" title={<T id="help.documentation" m="Documentation" />} subtitle={<T id="help.documentation.subtitle" m="dcrn.xyz/help"/>}/>
      <HelpLink className={"help-stakepools-icon"} href="https://dcrn.xyz/vsp" title={<T id="help.stakepools" m=" VSPs" />} subtitle={<T id="help.stakepools.subtitle" m="dcrn.xyz/vsp"/>}/>
      <HelpLink className={"help-blockchain-explorer-icon"} href="https://data.dcrn.xyz" title={<T id="help.blockchain" m=" Blockchain Explorer" />} subtitle={<T id="help.blockchain.subtitle" m="data.dcrn.xyz"/>}/>
      <HelpLink className={"help-github-icon"} href="https://github.com/Decred-Next/decredniton" title={<T id="help.github.title" m="GitHub"/>} subtitle={<T id="help.github.subtitle" m="github.com/Decred-Next/decredniton"/>} />
      {/*<HelpLinkInfoModal className={"help-constitution-icon"}
        title={<T id="help.constitution" m="Constitution"/>}
        subtitle={<T id="help.constitution.subtitle" m="Decred Project Constitution"/>}
        modalTitle={<h1><T id="help.constitution.modal.title" m="Decred Constitution" /></h1>}
        modalContent={<Documentation name="DecredConstitution" />}
        double
      />*/}
      <HelpLinkAboutModal className={"help-star-icon"}
        title={<T id="help.about.decrediton" m="About MyDcrn"/>}
        subtitle={<T id="help.about.decrediton.subtitle" m="Software Summary"/>}
      />
    </div>
    {/*<Subtitle title={<T id="help.subtitle.communications" m="Communications"/>} />
    <div className="help-icons-list">
      <HelpLink className={"help-matrix-icon"} href="https://decred.org/matrix" title={<T id="help.matrix" m="Matrix Chat" />} subtitle={<T id="help.matrix.subtitle" m="riot.im"/>}/>
      <HelpLink className={"help-slack-icon"} href="https://slack.decred.org" title={<T id="help.slack" m="Slack" />} subtitle={<T id="help.slack.subtitle" m="slack.decred.org"/>}/>
      <HelpLink className={"help-forum-icon"} href="https://t.me/decred" title={<T id="help.telegram" m="Telegram" />} subtitle={<T id="help.telegram.subtitle" m="t.me/decred"/>}/>
    </div>*/}
  </>
);
