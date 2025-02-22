import * as E from "fp-ts/lib/Either";
import { View } from "react-native";
import { createStore } from "redux";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { BpdConfig } from "../../../../../../../definitions/content/BpdConfig";
import { EnableableFunctionsEnum } from "../../../../../../../definitions/pagopa/EnableableFunctions";
import { applicationChangeState } from "../../../../../../store/actions/application";
import { navigateToWalletHome } from "../../../../../../store/actions/navigation";
import { appReducer } from "../../../../../../store/reducers";
import { bpdRemoteConfigSelector } from "../../../../../../store/reducers/backendStatus";
import { mockPrivativeCard } from "../../../../../../store/reducers/wallet/__mocks__/wallets";
import { renderScreenFakeNavRedux } from "../../../../../../utils/testWrapper";
import { navigateToSuggestBpdActivation } from "../../../../../wallet/onboarding/bancomat/navigation/action";
import { navigateToActivateBpdOnNewPrivative } from "../../../../../wallet/onboarding/privative/navigation/action";
import { activateBpdOnNewPaymentMethods } from "../activateBpdOnNewAddedPaymentMethods";
import { isBpdEnabled } from "../onboarding/startOnboarding";

const enrollAfterAddTrue: BpdConfig = {
  enroll_bpd_after_add_payment_method: true,
  program_active: true,
  opt_in_payment_methods: false,
  opt_in_payment_methods_v2: false
};

const enrollAfterAddFalse: BpdConfig = {
  enroll_bpd_after_add_payment_method: false,
  program_active: true,
  opt_in_payment_methods: false,
  opt_in_payment_methods_v2: false
};

describe("Test activateBpdOnNewPaymentMethods behaviour", () => {
  jest.useFakeTimers();

  beforeEach(() => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);
    renderScreenFakeNavRedux(View, "DUMMY", {}, store);
  });

  it("With default state and no payment methods, should navigate to wallet home", async () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);

    // We trigger the initialization of the NavigationService
    renderScreenFakeNavRedux(View, "DUMMY", {}, store);

    await expectSaga(
      activateBpdOnNewPaymentMethods,
      [],
      navigateToActivateBpdOnNewPrivative
    )
      .withState(store.getState())
      .call(navigateToWalletHome)
      .not.call(isBpdEnabled)
      .not.select(bpdRemoteConfigSelector)
      .not.call(navigateToActivateBpdOnNewPrivative)
      .not.call(navigateToSuggestBpdActivation)
      .run();
  });

  it("With at least one payment method with bpd capability and an error to retrieve the bpd enrolling, should navigate to wallet home", async () => {
    await expectSaga(
      activateBpdOnNewPaymentMethods,
      [mockPrivativeCard],
      navigateToActivateBpdOnNewPrivative
    )
      .provide([
        [matchers.call(isBpdEnabled), E.left(new Error("An error"))],
        [matchers.select(bpdRemoteConfigSelector), enrollAfterAddFalse]
      ])
      .call(isBpdEnabled)
      .call(navigateToWalletHome)
      .select(bpdRemoteConfigSelector)
      .not.call(navigateToActivateBpdOnNewPrivative)
      .not.call(navigateToSuggestBpdActivation)
      .run();
  });

  it("With all payment methods without bpd capability, should navigate to navigateToWalletHome", async () => {
    await expectSaga(
      activateBpdOnNewPaymentMethods,
      [
        {
          ...mockPrivativeCard,
          enableableFunctions: [
            EnableableFunctionsEnum.FA,
            EnableableFunctionsEnum.pagoPA
          ]
        }
      ],
      navigateToActivateBpdOnNewPrivative
    )
      .provide([
        [matchers.call(isBpdEnabled), E.right(true)],
        [matchers.select(bpdRemoteConfigSelector), enrollAfterAddFalse]
      ])
      .call(navigateToWalletHome)
      .not.call(isBpdEnabled)
      .not.select(bpdRemoteConfigSelector)
      .not.call(navigateToActivateBpdOnNewPrivative)
      .not.call(navigateToSuggestBpdActivation)
      .run();
  });

  it("With at least one payment method with bpd capability, bpd enrolled and program_active === true, should navigate to navigateToActivateBpdOnNewPrivative", async () => {
    await expectSaga(
      activateBpdOnNewPaymentMethods,
      [mockPrivativeCard],
      navigateToActivateBpdOnNewPrivative
    )
      .provide([
        [matchers.call(isBpdEnabled), E.right(true)],
        [matchers.select(bpdRemoteConfigSelector), enrollAfterAddFalse]
      ])
      .not.call(navigateToWalletHome)
      .call(isBpdEnabled)
      .select(bpdRemoteConfigSelector)
      .call(navigateToActivateBpdOnNewPrivative)
      .not.call(navigateToSuggestBpdActivation)
      .run();
  });

  it("With at least one payment method with bpd capability, bpd enrolled and program_active === false, should navigate to navigateToActivateBpdOnNewPrivative", async () => {
    await expectSaga(
      activateBpdOnNewPaymentMethods,
      [mockPrivativeCard],
      navigateToActivateBpdOnNewPrivative
    )
      .provide([
        [matchers.call(isBpdEnabled), E.right(true)],
        [
          matchers.select(bpdRemoteConfigSelector),
          { ...enrollAfterAddFalse, program_active: false }
        ]
      ])
      .not.call(navigateToWalletHome)
      .call(isBpdEnabled)
      .select(bpdRemoteConfigSelector)
      .not.call(navigateToActivateBpdOnNewPrivative)
      .not.call(navigateToSuggestBpdActivation)
      .run();
  });

  it("With at least one payment method with bpd capability, bpd not enrolled and remote configuration false or undefined should navigate to navigateToWalletHome", async () => {
    await expectSaga(
      activateBpdOnNewPaymentMethods,
      [mockPrivativeCard],
      navigateToActivateBpdOnNewPrivative
    )
      .provide([
        [matchers.call(isBpdEnabled), E.right(false)],
        [matchers.select(bpdRemoteConfigSelector), enrollAfterAddFalse]
      ])
      .call(isBpdEnabled)
      .select(bpdRemoteConfigSelector)
      .not.call(navigateToActivateBpdOnNewPrivative)
      .not.call(navigateToSuggestBpdActivation)
      .run();

    await expectSaga(
      activateBpdOnNewPaymentMethods,
      [mockPrivativeCard],
      navigateToActivateBpdOnNewPrivative
    )
      .provide([
        [matchers.call(isBpdEnabled), E.right(false)],
        [matchers.select(bpdRemoteConfigSelector), undefined]
      ])
      .call(isBpdEnabled)
      .select(bpdRemoteConfigSelector)
      .not.call(navigateToActivateBpdOnNewPrivative)
      .not.call(navigateToSuggestBpdActivation)
      .run();
  });

  it("With at least one payment method with bpd capability, bpd not enrolled and remote configuration true, should navigate to navigateToWalletHome", async () => {
    await expectSaga(
      activateBpdOnNewPaymentMethods,
      [mockPrivativeCard],
      navigateToActivateBpdOnNewPrivative
    )
      .provide([
        [matchers.call(isBpdEnabled), E.right(false)],
        [matchers.select(bpdRemoteConfigSelector), enrollAfterAddTrue]
      ])
      .call(isBpdEnabled)
      .select(bpdRemoteConfigSelector)
      .not.call(navigateToActivateBpdOnNewPrivative)
      .call(navigateToSuggestBpdActivation)
      .run();
  });
});
