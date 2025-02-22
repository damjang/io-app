import * as pot from "@pagopa/ts-commons/lib/pot";
import { useNavigation } from "@react-navigation/native";
import { List as NBList } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { OperationListDTO } from "../../../../../../definitions/idpay/timeline/OperationListDTO";
import { OperationTypeEnum as TransactionOperationTypeEnum } from "../../../../../../definitions/idpay/timeline/TransactionOperationDTO";
import { VSpacer } from "../../../../../components/core/spacer/Spacer";
import { Body } from "../../../../../components/core/typography/Body";
import { H3 } from "../../../../../components/core/typography/H3";
import { LabelSmall } from "../../../../../components/core/typography/LabelSmall";
import { IOStyles } from "../../../../../components/core/variables/IOStyles";
import I18n from "../../../../../i18n";
import {
  AppParamsList,
  IOStackNavigationProp
} from "../../../../../navigation/params/AppParamsList";
import { useIODispatch, useIOSelector } from "../../../../../store/hooks";
import { IDPayDetailsRoutes } from "../navigation";
import {
  idpayPaginatedTimelineSelector,
  idpayTimelineSelector
} from "../store";
import { idpayTimelinePageGet } from "../store/actions";
import { useTimelineDetailsBottomSheet } from "./TimelineDetailsBottomSheet";
import { TimelineOperationListItem } from "./TimelineOperationListItem";

const styles = StyleSheet.create({
  spaceBetween: {
    justifyContent: "space-between"
  }
});

const emptyTimelineContent = (
  <>
    <H3>
      {I18n.t(
        "idpay.initiative.details.initiativeDetailsScreen.configured.yourOperations"
      )}
    </H3>
    <VSpacer size={16} />
    <LabelSmall weight="Regular" color="bluegreyDark">
      {I18n.t(
        "idpay.initiative.details.initiativeDetailsScreen.configured.yourOperationsSubtitle"
      )}
      <LabelSmall weight="SemiBold">
        {I18n.t(
          "idpay.initiative.details.initiativeDetailsScreen.configured.yourOperationsLink"
        )}
      </LabelSmall>
    </LabelSmall>
  </>
);

type Props = {
  initiativeId: string;
};

const ConfiguredInitiativeData = (props: Props) => {
  const { initiativeId } = props;

  const navigation = useNavigation<IOStackNavigationProp<AppParamsList>>();
  const dispatch = useIODispatch();

  useEffect(() => {
    dispatch(idpayTimelinePageGet.request({ initiativeId, page: 0 }));
  }, [dispatch, initiativeId]);

  const detailsBottomSheet = useTimelineDetailsBottomSheet(initiativeId);

  const paginatedTimelinePot = useIOSelector(idpayPaginatedTimelineSelector);
  const timeline = useIOSelector(idpayTimelineSelector);
  const isLoading = pot.isLoading(paginatedTimelinePot);

  if (isLoading) {
    return null;
  }

  if (timeline.length === 0) {
    return emptyTimelineContent;
  }

  const navigateToOperationsList = () => {
    navigation.navigate(IDPayDetailsRoutes.IDPAY_DETAILS_MAIN, {
      screen: IDPayDetailsRoutes.IDPAY_DETAILS_TIMELINE,
      params: {
        initiativeId
      }
    });
  };

  const showOperationDetailsBottomSheet = (operation: OperationListDTO) => {
    if (operation.operationType === TransactionOperationTypeEnum.TRANSACTION) {
      // Currently we only show details for transaction operations
      detailsBottomSheet.present(operation.operationId);
    }
  };

  return (
    <>
      <View style={[IOStyles.row, styles.spaceBetween]}>
        <H3>
          {I18n.t(
            "idpay.initiative.details.initiativeDetailsScreen.configured.yourOperations"
          )}
        </H3>
        <Body weight="SemiBold" color="blue" onPress={navigateToOperationsList}>
          {I18n.t(
            "idpay.initiative.details.initiativeDetailsScreen.configured.settings.showMore"
          )}
        </Body>
      </View>
      <VSpacer size={8} />
      <NBList>
        {timeline.slice(0, 3).map(operation => (
          <TimelineOperationListItem
            key={operation.operationId}
            operation={operation}
            onPress={() => showOperationDetailsBottomSheet(operation)}
          />
        ))}
      </NBList>
      {detailsBottomSheet.bottomSheet}
    </>
  );
};

export default ConfiguredInitiativeData;
