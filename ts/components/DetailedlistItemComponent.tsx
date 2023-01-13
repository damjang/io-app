import { Badge, Text as NBText, View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import customVariables from "../theme/variables";
import I18n from "../i18n";
import { IOColors } from "./core/variables/IOColors";
import { BadgeComponent } from "./screens/BadgeComponent";
import TouchableDefaultOpacity from "./TouchableDefaultOpacity";
import IconFont from "./ui/IconFont";
import { H5 } from "./core/typography/H5";
import { H3 } from "./core/typography/H3";

type OwnProps = Readonly<{
  text11: string;
  text12: string;
  text2: string;
  text3: string;
  isNew: boolean;
  isPaid?: boolean;
  onPressItem: () => void;
  onLongPressItem?: () => void;
  isSelectionModeEnabled?: boolean;
  isItemSelected?: boolean;
}>;

type Props = OwnProps & React.ComponentProps<typeof TouchableDefaultOpacity>;

const styles = StyleSheet.create({
  smallSpacer: {
    width: "100%",
    height: 4
  },
  verticalPad: {
    paddingVertical: customVariables.spacerHeight
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  headerMain: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "100%"
  },
  headerSub: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto"
  },
  badgeContainer: {
    flex: 0,
    paddingRight: 8,
    alignSelf: "flex-start",
    paddingTop: 6.5,
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto"
  },
  viewStyle: {
    flexDirection: "row"
  },
  text12: {
    lineHeight: 18,
    marginBottom: -4
  },
  icon: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto"
  },
  text3Line: {
    flex: 1,
    flexDirection: "row"
  },
  text3Container: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "100%",
    minHeight: 24
  },
  text3SubContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "100%"
  },
  badgeInfo: {
    borderWidth: 1,
    borderStyle: "solid",
    width: 65,
    height: 25,
    flexDirection: "row"
  },
  badgeInfoPaid: {
    borderColor: IOColors.aqua,
    backgroundColor: IOColors.aqua
  }
});

const ICON_WIDTH = 24;

/**
 * A component to display a touchable list item
 */
export default class DetailedlistItemComponent extends React.Component<Props> {
  private getIconName = () =>
    this.props.isSelectionModeEnabled
      ? this.props.isItemSelected
        ? "io-checkbox-on"
        : "io-checkbox-off"
      : "io-right";

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    // assuming that:
    //  - messages are immutable
    //  - if the component is somehow reused the text content changes (avoid stale callbacks)
    return (
      this.props.isPaid !== nextProps.isPaid ||
      this.props.isNew !== nextProps.isNew ||
      this.props.isSelectionModeEnabled !== nextProps.isSelectionModeEnabled ||
      this.props.isItemSelected !== nextProps.isItemSelected ||
      this.props.text3 !== nextProps.text3 ||
      this.props.text2 !== nextProps.text2 ||
      this.props.text12 !== nextProps.text12 ||
      this.props.text11 !== nextProps.text11
    );
  }

  public render() {
    return (
      <TouchableDefaultOpacity
        onPress={this.props.onPressItem}
        onLongPress={this.props.onLongPressItem}
        style={styles.verticalPad}
        {...this.props}
      >
        <View style={styles.header}>
          <View style={styles.headerMain}>
            <H5>{this.props.text11}</H5>
          </View>

          <View style={styles.headerSub}>
            <NBText bold={true} style={styles.text12}>
              {this.props.text12}
            </NBText>
          </View>
        </View>

        <View style={styles.viewStyle}>
          <NBText>{this.props.text2}</NBText>
        </View>
        <View style={styles.smallSpacer} />
        <View style={styles.text3Line}>
          <View style={styles.text3Container}>
            {this.props.isNew && (
              <View style={styles.badgeContainer}>
                <BadgeComponent />
              </View>
            )}
            <View style={styles.text3SubContainer}>
              <H3 numberOfLines={2}>{this.props.text3}</H3>
            </View>
          </View>

          <View style={styles.icon}>
            {this.props.isPaid && (
              <Badge style={[styles.badgeInfo, styles.badgeInfoPaid]}>
                <H5 color="bluegreyDark">{I18n.t("messages.badge.paid")}</H5>
              </Badge>
            )}

            <IconFont
              name={this.getIconName()}
              size={ICON_WIDTH}
              color={customVariables.contentPrimaryBackground}
            />
          </View>
        </View>
        {this.props.children}
      </TouchableDefaultOpacity>
    );
  }
}
