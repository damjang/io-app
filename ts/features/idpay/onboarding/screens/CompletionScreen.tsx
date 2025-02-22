import React from "react";
import { useActor } from "@xstate/react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useOnboardingMachineService } from "../xstate/provider";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import themeVariables from "../../../../theme/variables";
import FooterWithButtons from "../../../../components/ui/FooterWithButtons";
import I18n from "../../../../i18n";

type CompletionScreenRouteRaparms = undefined;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: themeVariables.contentPadding
  }
});

const CompletionScreen = () => {
  const onboardingMachineService = useOnboardingMachineService();
  const [state, send] = useActor(onboardingMachineService);

  const content = React.useMemo(() => {
    if (state.matches("ACCEPTING_REQUIRED_CRITERIA")) {
      return <Text>{I18n.t("idpay.onboarding.success.pleaseWait")}</Text>;
    }

    if (state.matches("DISPLAYING_ONBOARDING_COMPLETED")) {
      return <Text>{I18n.t("idpay.onboarding.success.requestSent")}</Text>;
    }

    return null;
  }, [state]);

  const handleClosePress = () => {
    send({ type: "QUIT_ONBOARDING" });
  };

  return (
    <SafeAreaView style={IOStyles.flex} testID={"onboardingCompletionScreen"}>
      <View style={styles.container}>{content}</View>
      <FooterWithButtons
        type="SingleButton"
        leftButton={{
          title: I18n.t("idpay.onboarding.success.understoodCta"),
          testID: "closeButton",
          onPress: handleClosePress
        }}
      />
    </SafeAreaView>
  );
};

export type { CompletionScreenRouteRaparms };

export default CompletionScreen;
