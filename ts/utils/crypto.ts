import {
  deleteKey,
  generate,
  getPublicKey
} from "@pagopa/io-react-native-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pipe } from "fp-ts/lib/function";
import * as T from "fp-ts/lib/Task";
import * as TE from "fp-ts/lib/TaskEither";

export type KeyGenerationInfo = {
  keyTag: string;
  keyType?: string;
  errorCode?: string;
  userInfo?: Record<string, string>;
};

export const wipeKeyGenerationInfo = async (keyTag: string) =>
  pipe(
    TE.tryCatch(
      () => AsyncStorage.removeItem(keyTag),
      () => false
    ),
    TE.map(_ => true),
    TE.getOrElse(() => T.of(false))
  )();

// TODO: we should consider storing this data on redux instead
// to access the AsyncStorage directly.
// https://pagopa.atlassian.net/browse/LLK-43
export const setKeyGenerationInfo = async (
  keyTag: string,
  value: KeyGenerationInfo
) =>
  pipe(
    TE.tryCatch(
      () => AsyncStorage.setItem(keyTag, JSON.stringify(value)),
      () => false
    ),
    TE.map(_ => true),
    TE.getOrElse(() => T.of(false))
  )();

export const getKeyGenerationInfo = async (
  keyTag: string
): Promise<KeyGenerationInfo | null> =>
  pipe(
    TE.tryCatch(
      () => AsyncStorage.getItem(keyTag),
      () => null
    ),
    TE.map(value => {
      if (value) {
        return JSON.parse(value);
      } else {
        return null;
      }
    }),
    TE.getOrElse(() => T.of(null))
  )();

export const checkPublicKeyExists = (keyTag: string) =>
  pipe(
    TE.tryCatch(
      () => getPublicKey(keyTag),
      () => false
    ),
    TE.map(_ => true),
    TE.getOrElse(() => T.of(false))
  )();

export const taskRegenerateKey = (keyTag: string) =>
  pipe(
    TE.tryCatch(
      () => deleteKey(keyTag),
      () => undefined
    ),
    TE.chain(() =>
      TE.tryCatch(
        () => generate(keyTag),
        () => undefined
      )
    ),
    TE.getOrElseW(() => T.of(undefined))
  )();

export const taskGetPublicKey = (keyTag: string) =>
  pipe(
    TE.tryCatch(
      () => getPublicKey(keyTag),
      () => undefined
    ),
    TE.getOrElseW(() => T.of(undefined))
  )();

export const taskGeneratePublicKey = (keyTag: string) =>
  pipe(
    TE.tryCatch(
      () => generate(keyTag),
      () => undefined
    ),
    TE.getOrElseW(() => T.of(undefined))
  )();

export const deleteKeyPair = (keyTag: string) =>
  pipe(
    TE.tryCatch(
      () => wipeKeyGenerationInfo(keyTag),
      () => false
    ),
    TE.chain(() =>
      TE.tryCatch(
        () => deleteKey(keyTag),
        () => false
      )
    ),
    TE.map(_ => true),
    TE.getOrElse(() => T.of(false))
  )();
