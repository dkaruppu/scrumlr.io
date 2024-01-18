import classNames from "classnames";
import {VFC, useState} from "react";
import {useTranslation} from "react-i18next";
import {ReactComponent as ExportCSV} from "assets/icon-export-csv.svg";
import {ReactComponent as ExportJSON} from "assets/icon-export-json.svg";
import {ReactComponent as PrintIcon} from "assets/icon-print.svg";
import {ReactComponent as ClipboardIcon} from "assets/icon-clipboard.svg";
import {useAppSelector} from "store";
import {exportAsJSON, exportAsCSV, getMarkdownExport, exportToConfluence} from "utils/export";
import {Toast} from "utils/Toast";
import {TOAST_TIMER_SHORT} from "constants/misc";
import {getFromStorage, saveToStorage} from "utils/storage";
import {SettingsButton} from "../Components/SettingsButton";
import {ExportHintHiddenColumns} from "./ExportHintHiddenColumns";
import "./ExportBoard.scss";
import "../SettingsDialog.scss";
import {IS_EXPORTED_TO_CONFLUENCE_STORAGE_KEY} from "constants/storage";

export const ExportBoard: VFC = () => {
  const {t} = useTranslation();

  const boardId = useAppSelector((state) => state.board.data!.id);
  const boardName = useAppSelector((state) => state.board.data!.name);
  const columns = useAppSelector((state) => state.columns);
  const confluencePageId = useAppSelector((state) => state.confluencePage);
  const [isBoardExportedToConfluence, setBoardExportedToConfluence] = useState(getFromStorage(IS_EXPORTED_TO_CONFLUENCE_STORAGE_KEY) === "true");

  return (
    <div data-testid="export" className="settings-dialog__container">
      <div className="settings-dialog__header">
        <h2 className={classNames("settings-dialog__header-text", "accent-color__backlog-blue")}> {t("ExportBoardOption.title")}</h2>
      </div>

      <div className={classNames("settings-dialog__group", "accent-color__backlog-blue")}>
        <SettingsButton
          label={t("ExportBoardOption.exportAsJson")}
          icon={ExportJSON}
          className="export-board__button-reverse-order"
          onClick={() => {
            exportAsJSON(boardId, boardName);
          }}
          data-testid="export-json"
        />
        <hr className="settings-dialog__separator" />
        <SettingsButton
          label={t("ExportBoardOption.exportAsCSV")}
          icon={ExportCSV}
          className="export-board__button-reverse-order"
          onClick={() => {
            exportAsCSV(boardId, boardName);
          }}
          data-testid="export-csv"
        />
        <hr className="settings-dialog__separator" />
        <SettingsButton
          label={t("ExportBoardOption.exportToConfluence")}
          icon={ClipboardIcon}
          className="export-board__button-reverse-order"
          onClick={() => {
            if (!isBoardExportedToConfluence)
              exportToConfluence(boardId, confluencePageId)
                .then((result) => {
                  if (result.BoardId) {
                    setBoardExportedToConfluence(true);
                    saveToStorage(IS_EXPORTED_TO_CONFLUENCE_STORAGE_KEY, "true");
                    Toast.success({title: t("ExportBoardOption.exportToConfluenceSuccess"), autoClose: TOAST_TIMER_SHORT});
                  }
                })
                .catch(() => {
                  Toast.error({title: t("ExportBoardOption.exportToConfluenceFailure"), autoClose: TOAST_TIMER_SHORT});
                  saveToStorage(IS_EXPORTED_TO_CONFLUENCE_STORAGE_KEY, "false");
                  setBoardExportedToConfluence(false);
                });
            else Toast.info({title: t("ExportBoardOption.alreadyExportedToConfluence"), autoClose: TOAST_TIMER_SHORT});
          }}
          data-testid="export-confluence"
        />
        <hr className="settings-dialog__separator" />
        <SettingsButton
          label={t("ExportBoardOption.openPrintView")}
          icon={PrintIcon}
          className="export-board__button-reverse-order export-board__button-print-view"
          onClick={() => {
            window.open(`/board/${boardId}/print`, "_blank");
          }}
        />
        <hr className="settings-dialog__separator" />
        <SettingsButton
          label={t("ExportBoardOption.exportToClipboard")}
          icon={ClipboardIcon}
          className="export-board__button-reverse-order"
          onClick={() => {
            getMarkdownExport(boardId).then((result) => {
              navigator.clipboard.writeText(result).then(() => {
                Toast.success({title: t("ExportBoardOption.copyToClipboardSuccess"), autoClose: TOAST_TIMER_SHORT});
              });
            });
          }}
          data-testid="export-markdown"
        />
      </div>

      <ExportHintHiddenColumns columns={columns} />
    </div>
  );
};
