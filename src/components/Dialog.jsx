import { Close, Lock } from "@mui/icons-material";
import dialogPolyfill from "dialog-polyfill";
import "dialog-polyfill/dist/dialog-polyfill.css";
import React, { forwardRef, useContext, useState } from "react";
import assets from "../assets";
import { TeamContext } from "../contexts/BaseContext";
import { useFirebase } from "../utils/firebase";
import { useTranslation } from "../utils/languages";
import CustomButtonPrimary from "./button/CustomButtonPrimary";
import Whitespace from "./common/Whitespace";
import HintComponent from "./Hints";

import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";
import { Box, Button, Modal } from "@mui/material";
import HintButton from "./HintButton";

export let Dialog = forwardRef(
  (
    /** @type {import("react").HTMLProps<HTMLDialogElement> & { onClose?: (e: CloseEvent) => void }} */ props,
    ref
  ) => {
    /** @type {import("react").MutableRefObject<HTMLDialogElement>} */
    let dialog_ref = /** @type {any} */ (ref);

    React.useLayoutEffect(() => {
      // @ts-ignore
      dialogPolyfill.registerDialog(dialog_ref.current);

      /** @type {NodeListOf<HTMLVideoElement>} */
      let playable_elements = dialog_ref.current.querySelectorAll(
        "video[autoplay], audio[autoplay]"
      );
      for (let element of playable_elements) {
        element.pause();
        element.currentTime = 0;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <dialog
        {...props}
        ref={dialog_ref}
        // @ts-ignore
        onClose={(e) => {
          let playable_elements =
            e.currentTarget.querySelectorAll("video, audio");
          for (let playable of playable_elements) {
            playable.pause();
          }
          props?.onClose?.(e);
        }}
      />
    );
  }
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  background: "#fff",
  boxShadow: 24,
  p: 2,
};

/**
 * @typedef THint
 * @type {{
 *  text: string,
 *  bought: boolean,
 *  penalty_minutes: number,
 *  onBuy: () => void,
 * }}
 */
export let HintsDialog = ({ open, handleClose, hints }) => {
  let team_ref = useContext(TeamContext);
  let team = useFirebase(team_ref);
  let t = useTranslation();

  return (
    // <Dialog
    //   className="fancy-backdrop"
    //   onClick={(e) => {
    //     if (e.target === e.currentTarget) forward_ref.current.close();
    //   }}
    //   ref={forward_ref}
    //   style={{
    //     color: "white",
    //     width: "600px",
    //   }}
    // >
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 16,
          margin: "auto",
          width: "100%",
        }}
      > */}
      <Box sx={style}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            backgroundColor: "var(--color-white)",
            paddingTop: 20,
            paddingLeft: 20,
            color: "var(--color-1)",
          }}
        >
          <CloseIcon onClick={handleClose} />
        </div>
        <div
          style={{
            backgroundColor: "var(--color-white)",
            padding: "40px 20px",
          }}
        >
          <h1
            tabIndex={-1}
            style={{
              color: "var(--color-black)",
              marginBottom: 20,
            }}
          >
            {t("Need hints?")}
          </h1>
          <p
            style={{
              color: "var(--color-black)",
              fontSize: 22,
            }}
          >
            Need a little bit of help? Unlock some hints and solve the puzzle.
            <b>Beware!</b> Unlocking hints will give you a time penalty!
          </p>
          <Whitespace height={20} />
          {hints.map((hint, i) => (
            <div
              key={i}
              style={{
                minWidth: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
                padding: !hint.bought ? "16px 0 16px 0 " : 0,
                marginBottom: 16,
              }}
            >
              {hint.bought ? (
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "1.5em",
                        color: "var(--color-black)",
                        fontWeight: "bold",
                      }}
                    >
                      {t("Hint")} {i + 1}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "var(--color-black)",
                      fontSize: 20,
                    }}
                  >
                    <HintComponent
                      text={hint.text.text}
                      image={hint.text.image}
                    />
                  </div>
                </div>
              ) : (
                // <></>
                <HintButton
                  hint={hint}
                  number={i + 1}
                  team_ref={team_ref}
                  team={team}
                />
              )}
            </div>
          ))}
        </div>
      </Box>
      {/* </div> */}
    </Modal>
  );
};
