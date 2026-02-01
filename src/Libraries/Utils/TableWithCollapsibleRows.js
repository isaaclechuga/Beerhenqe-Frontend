import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Collapse,
  //Checkbox,
  IconButton,
  TableContainer,
} from "@material-ui/core";
import { RemoveCircle, AddCircle, Menu } from "@material-ui/icons";
import Currency from "react-currency-formatter";

export default class TableWithCollapsibleRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedRow: undefined,
      numSelected: 0,
      rowCount: 0,
      rowsSelected: [],
    };
    this.titles = [
      "SKU",
      "DESCRIPCIÓN",
      "CANTIDAD",
      "PIEZAS RETORNADAS",
      "MONTO",
    ];
  }

  componentDidMount() {
    const rowCount = this.props.data.filter((i) => !i.isDisabled).length;
    this.setState({ rowCount });
  }

  handleSelectAllClick = () => {
    if (this.state.numSelected === 0) {
      const dataFiltered = this.props.data.filter(
        (i) => !i.isDisabled && i.dependencyFilter !== "1"
      );
      const rowsSelected = dataFiltered.map((item) => {
        const { id, itemCode, quantity, amount, dependencyFilter } = item;
        return { id, itemCode, quantity, amount, dependencyFilter };
      });
      this.setState({ numSelected: this.state.rowCount, rowsSelected }, () =>
        this.props.handleDataToProcess(rowsSelected)
      );
    } else {
      this.setState({ numSelected: 0, rowsSelected: [] }, () =>
        this.props.handleDataToProcess([])
      );
    }
  };

  handleRowChildClick = (event, item) => {
    let newSelected = this.state.rowsSelected;
    item.manualQuantity = 0;
    newSelected = this.selectUnselectDataChild(
      item,
      newSelected,
      event.target.checked
    );
    this.setState(
      { rowsSelected: newSelected, numSelected: newSelected.length },
      () => this.props.handleDataToProcess(newSelected)
    );
  };
  handleRowClick = (item, index, event) => {
    const dependencyFilter = parseInt(item.dependencyFilter);
    dependencyFilter === 1 &&
    this.state.collapsedRow !== undefined &&
    this.state.collapsedRow === index
      ? this.setState({ collapsedRow: undefined })
      : dependencyFilter === 1 && this.state.collapsedRow !== undefined
      ? this.setState({ collapsedRow: index })
      : dependencyFilter === 1 && this.setState({ collapsedRow: index });
  };

  selectUnselectData = (
    item,
    rowsSelected,
    dependencyFilter = -1,
    isChecked = false
  ) => {
    const selectedIndex = rowsSelected
      .map((item) => item[this.props.fieldToProcessData])
      .indexOf(item[this.props.fieldToProcessData]); //inidice del producto clickeado
    let newSelected = [];
    //debugger
    const { id, itemCode, quantity, amount, manualQuantity } = item;
    const dF = item.dependencyFilter;
    if (dependencyFilter === 1) {
      //si el producto es el cabecero de una promocion
      if (isChecked) {
        //si es checkeado
        if (selectedIndex === -1) {
          //si no esta en el arreglo de productos checkeados
          newSelected = newSelected.concat(rowsSelected, {
            id,
            itemCode,
            quantity,
            amount,
            dependencyFilter: dF,
            manualQuantity,
          }); //insertamos el producto (cabecero promocion)
        } else {
          newSelected = rowsSelected; //si ya esta no hacemos nada y retornamos tal cual procesamos
        }
      } else {
        //si es deseleccionado el cabecero de promocion
        if (selectedIndex === 0) {
          //si esta en el indice 0 del arreglo de productos checkeados
          newSelected = newSelected.concat(rowsSelected.slice(1)); //removemos ese indice
        } else if (selectedIndex === rowsSelected.length - 1) {
          //si esta en el ultimo indice
          newSelected = newSelected.concat(rowsSelected.slice(0, -1)); //removemos el ultimo indice
        } else if (selectedIndex > 0) {
          //si esta dentro del indice 0 al ultimo
          newSelected = newSelected.concat(
            //removemos el indice encontrado
            rowsSelected.slice(0, selectedIndex),
            rowsSelected.slice(selectedIndex + 1)
          );
        } else {
          newSelected = rowsSelected; //si no esta dejamos todo como está
        }
      }
    } else {
      //si no es cabecero de promocion
      if (selectedIndex === -1) {
        //si no esta en el arreglo de productos checkeados
        newSelected = newSelected.concat(rowsSelected, {
          id,
          itemCode,
          quantity,
          amount,
          dependencyFilter: dF,
          manualQuantity,
        }); //agregamos el producto
      } else if (selectedIndex === 0) {
        //si esta en el indice 0
        newSelected = newSelected.concat(rowsSelected.slice(1)); //lo quitamos por accion natural de un checkbox
      } else if (selectedIndex === rowsSelected.length - 1) {
        //si esta en el ultimo indice
        newSelected = newSelected.concat(rowsSelected.slice(0, -1)); //lo quitamos por accion natural de un checkbox
      } else if (selectedIndex > 0) {
        //y si esta en un indice distinto a 0 y ultimo
        newSelected = newSelected.concat(
          //lo quitamos por accion natural de un checkbox
          rowsSelected.slice(0, selectedIndex),
          rowsSelected.slice(selectedIndex + 1)
        );
      }
    }

    return newSelected; //retornamos el nuevo arreglo de productos checkeados
  };
  selectUnselectDataChild = (
    item,
    rowsSelected,
    isChecked,
    isfromCheckBox = true
  ) => {
    const selectedIndex = rowsSelected
      .map((item) => item[this.props.fieldToProcessData])
      .indexOf(item[this.props.fieldToProcessData]); // trae el posible indice del producto que selecciona o deseleccionó
    let newSelected = [];
    const { id, itemCode, quantity, amount, dependencyFilter, manualQuantity } =
      item; // destructuring al producto seleccionado hijo de una promoción
    //const dF = parseInt(dependencyFilter); //parseo a entero de la dependencia de filtrado para igualar al id pedidodet
    if (isfromCheckBox) {
      if (isChecked) {
        //evalua si hizo check o no al campo checkbox del row del producto
        if (selectedIndex === -1) {
          //si no se encontro en los productos previamente checkeados
          newSelected = newSelected.concat(rowsSelected, {
            id,
            itemCode,
            quantity,
            amount,
            dependencyFilter,
            manualQuantity,
          }); //agrega el producto checkeado
        } else {
          newSelected = rowsSelected; //como ya existe no hace nada y retorna el arreglo sin modificaciones
        }
        // const father = this.props.data.find(i => i.id === dF); //traigo el padre del producto checkeado (cabecero promocion)
        // const dataToPush = {// datos a meter en el arreglo de productos seleccionados (cabecero promocion)
        //   id: father.id, itemCode: father.itemCode, quantity: father.quantity, amount: father.amount, dependencyFilter: father.dependencyFilter
        // }
        // const childOnDataLength = this.props.data.filter(i => i.dependencyFilter === item.dependencyFilter).length; //longitud de los productos hijos del papa (cabecero de la promocion)
        // const childOnSelectedLength = newSelected.filter(i => i.dependencyFilter === item.dependencyFilter).length;//longitud de los productos hijos checkeados
        // if (childOnDataLength === childOnSelectedLength)// si las longintudes son iguales metemos a los productos seleccionados el papa (cabecero de la promocion)
        //   newSelected.push(dataToPush);//push del cabecero de la promocion a los productos seleccionados
      } else {
        if (selectedIndex === 0) {
          // si el prodicto se encuentra en el indice 0
          newSelected = newSelected.concat(rowsSelected.slice(1)); //borrar indice 0 del arreglo de productos checkeados
        } else if (selectedIndex === rowsSelected.length - 1) {
          // si el indice esta al final
          newSelected = newSelected.concat(rowsSelected.slice(0, -1)); //borrar el ultimo indice del arreglo de productos checkeados
        } else if (selectedIndex > 0) {
          // si el indice no es el primero ni el ultimo
          newSelected = newSelected.concat(
            //borrar el indice donde se encuentre del arreglo de productos checkeados
            rowsSelected.slice(0, selectedIndex),
            rowsSelected.slice(selectedIndex + 1)
          );
        } else {
          newSelected = rowsSelected; //si no existe no hacemos nada y retornamos todo tal cual se recibió
        }
        // const father = newSelected.find(i => i.id === dF);
        // if (typeof father !== 'undefined') {//si el padre (cabecero promocion) existe en los productos checkeados
        //   const index = newSelected.indexOf(father);
        //   newSelected.splice(index, 1);//eliminamos al padre de los productos checkeados
        // }
      }
    } else {
      if (isChecked) {
        if (selectedIndex === -1) {
          //si no se encontro en los productos previamente checkeados
          newSelected = newSelected.concat(rowsSelected, {
            id,
            itemCode,
            quantity,
            amount,
            dependencyFilter,
            manualQuantity,
          }); //agrega el producto checkeado
        } else {
          if (selectedIndex === 0) {
            // si el prodicto se encuentra en el indice 0
            newSelected = newSelected.concat(
              newSelected.concat(rowsSelected.slice(1)),
              {
                id,
                itemCode,
                quantity,
                amount,
                dependencyFilter,
                manualQuantity,
              }
            ); //borrar indice 0 del arreglo de productos checkeados
          } else if (selectedIndex === rowsSelected.length - 1) {
            // si el indice esta al final
            newSelected = newSelected.concat(
              newSelected.concat(rowsSelected.slice(0, -1)),
              {
                id,
                itemCode,
                quantity,
                amount,
                dependencyFilter,
                manualQuantity,
              }
            ); //borrar el ultimo indice del arreglo de productos checkeados
          } else if (selectedIndex > 0) {
            // si el indice no es el primero ni el ultimo
            newSelected = newSelected.concat(
              newSelected.concat(
                //borrar el indice donde se encuentre del arreglo de productos checkeados
                rowsSelected.slice(0, selectedIndex),
                rowsSelected.slice(selectedIndex + 1)
              ),
              {
                id,
                itemCode,
                quantity,
                amount,
                dependencyFilter,
                manualQuantity,
              }
            );
          }
        }
      } else {
        if (selectedIndex === 0) {
          // si el prodicto se encuentra en el indice 0
          newSelected = newSelected.concat(rowsSelected.slice(1)); //borrar indice 0 del arreglo de productos checkeados
        } else if (selectedIndex === rowsSelected.length - 1) {
          // si el indice esta al final
          newSelected = newSelected.concat(rowsSelected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            //borrar el indice donde se encuentre del arreglo de productos checkeados
            rowsSelected.slice(0, selectedIndex),
            rowsSelected.slice(selectedIndex + 1)
          );
        }
      }
    }
    return newSelected; //retornamos el nuevo arreglo de productos checkeados
  };

  handleRowCheckBoxClick = (item, index, event) => {
    const dependencyFilter = parseInt(item.dependencyFilter);
    let newSelected = this.state.rowsSelected;
    item.manualQuantity = 0;
    if (dependencyFilter === 1) {
      //newSelected = this.selectUnselectData(item, newSelected);
      const childs = this.props.data.filter(
        (itemS) => itemS.dependencyFilter === item.id.toString()
      );
      childs.forEach((element) => {
        newSelected = this.selectUnselectData(
          element,
          newSelected,
          dependencyFilter,
          event.target.checked
        );
      });
    } else newSelected = this.selectUnselectData(item, newSelected);

    this.setState(
      { rowsSelected: newSelected, numSelected: newSelected.length },
      () => this.props.handleDataToProcess(newSelected)
    );
  };

  handleUpDownQuantity = (item, type) => {
    let newSelected = this.state.rowsSelected;
    if (type === "plus") {
      if (
        item.manualQuantity < item.quantity &&
        item.manualQuantity < item.quantity - item.onPreviousTickets
      ) {
        item.manualQuantity += 1;
        newSelected = this.selectUnselectDataChild(
          item,
          newSelected,
          true,
          false
        );
      }
    } else {
      if (item.manualQuantity >= 1) {
        item.manualQuantity -= 1;
        newSelected = this.selectUnselectDataChild(
          item,
          newSelected,
          item.manualQuantity > 0,
          false
        );
      }
    }
    this.setState(
      { rowsSelected: newSelected, numSelected: newSelected.length },
      () => this.props.handleDataToProcess(newSelected)
    );
  };

  isSelected = (itemId) => {
    const item = this.state.rowsSelected.find((item) => item.id === itemId);
    const evaluation = typeof item === "undefined";
    return !evaluation;
  };
  renderTitles = () => {
    return (
      <TableRow>
        {/* CHECKBOX */}
        {this.props.checkBoxRow && (
          <TableCell style={{ width: 75 }} className="text-center">
            {/* <Checkbox
              indeterminate={
                this.state.numSelected > 0 &&
                this.state.numSelected < this.state.rowCount
              }
              checked={this.state.numSelected === this.state.rowCount}
              onChange={this.handleSelectAllClick}
            /> */}
          </TableCell>
        )}

        {/* TITULOS */}
        {/* {this.titles.map((title, index) => (
          <TableCell align={'center'} key={index}>
            {title}
          </TableCell>
        ))} */}
        <TableCell align={"center"} style={{ width: 82 }}>
          SKU
        </TableCell>
        <TableCell align={"center"} style={{ width: 420 }}>
          DESCRIPCIÓN
        </TableCell>
        <TableCell align={"center"} style={{ width: 100 }}>
          CANTIDAD
        </TableCell>
        <TableCell align={"center"} style={{ width: 100 }}>
          PIEZAS RETORNADAS
        </TableCell>
        <TableCell align={"center"} style={{ width: 100 }}>
          MONTO
        </TableCell>

        {/* TITULO ACCIONES */}
        {this.props.actionsRow && (
          <TableCell align={"center"} style={{ width: 100 }}>
            ACCIONES
          </TableCell>
        )}
      </TableRow>
    );
  };
  renderRowChilds = (data, filter) => {
    const dataFiltered = data.filter(
      (item) => item.dependencyFilter === filter
    );
    return dataFiltered.map((item, index) => {
      //const labelId = `enhanced-table-checkbox-child-${index}`;
      return (
        <TableRow
          key={index}
          role="checkbox"
          className="background--white"
          style={
            parseInt(item.dependencyFilter) === 1
              ? { cursor: "pointer" }
              : item.isDisabled
              ? { background: "#b97c7c" }
              : {}
          }
          aria-checked={this.isSelected(item.id)}
          tabIndex={-1}
          selected={this.isSelected(item.id)}
        >
          {this.props.checkBoxRow &&
          !item.isDisabled &&
          item.dependencyFilter !== "1" ? (
            <TableCell padding="checkbox" className="text-center">
              {/* <Checkbox
                onChange={event => this.handleRowChildClick(event, item)}
                checked={this.isSelected(item.id)}
                inputProps={{ 'aria-labelledby': labelId }}
              /> */}
            </TableCell>
          ) : this.props.checkBoxRow &&
            item.isDisabled &&
            item.dependencyFilter !== "1" ? (
            <TableCell padding="checkbox" className="text-center">
              <RemoveCircle />
            </TableCell>
          ) : !this.props.checkBoxRow && item.dependencyFilter === "1" ? (
            <TableCell padding="checkbox" className="text-center">
              <Menu />
            </TableCell>
          ) : (
            this.props.checkBoxRow && <TableCell></TableCell>
          )}
          <TableCell align={"center"} style={{ width: 82 }}>
            {item.itemCode}
          </TableCell>
          <TableCell align={"center"} style={{ width: 420 }}>
            {item.description}
          </TableCell>
          <TableCell align={"center"} style={{ width: 100 }}>
            {item.quantity}
          </TableCell>
          <TableCell align={"center"} style={{ width: 100 }}>
            {item.onPreviousTickets}
          </TableCell>
          <TableCell align={"center"} style={{ width: 100 }}>
            <Currency quantity={item.amount} />
          </TableCell>
          {this.props.actionsRow &&
          !item.isDisabled &&
          item.dependencyFilter !== "1" ? (
            <TableCell align={"center"}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  style={{ outline: "none", color: "#7f9e7f" }}
                  aria-label="add"
                  onClick={() => this.handleUpDownQuantity(item, "plus")}
                >
                  <AddCircle />
                </IconButton>
                <span>{item.manualQuantity}</span>
                <IconButton
                  style={{ outline: "none", color: "#b97c7c" }}
                  aria-label="rest"
                  onClick={() => this.handleUpDownQuantity(item, "minus")}
                >
                  <RemoveCircle />
                </IconButton>
              </div>
            </TableCell>
          ) : (
            []
          )}
        </TableRow>
      );
    });
  };
  renderRowDescritionHelper = (lineType, description, id) => {
    const data = this.props.data;
    switch (lineType) {
      case "P":
        if (data.filter((i) => i.dependencyFilter === id.toString()).length > 0)
          return `Promoción/SET :: ${description}`;
        else return `Con descuento :: ${description}`;
      case "Z":
        return `Puntos Rewards :: ${description}`;
      default:
        return description;
    }
  };
  renderRows = () => {
    const data = this.props.data;
    return data
      .filter((item) => parseInt(item.dependencyFilter) < 2)
      .map((secondItem, index) => {
        //console.log('ITEM', secondItem);
        //const labelId = `enhanced-table-checkbox-${index}`;
        return [
          <TableRow
            key={`father${index}`}
            hover
            // style={
            //   parseInt(secondItem.dependencyFilter) === 1
            //     ? { cursor: 'pointer' }
            //     : secondItem.isDisabled
            //     ? { background: '#b97c7c' }
            //     : {}
            // }
            style={
              parseInt(secondItem.dependencyFilter) === 1
                ? { cursor: "pointer" }
                : secondItem.isDisabled
                ? { cursor: "not-allowed" }
                : {}
            }
            onClick={(event) => this.handleRowClick(secondItem, index, event)}
            role="checkbox"
            aria-checked={this.isSelected(secondItem.id)}
            tabIndex={-1}
            selected={this.isSelected(secondItem.id)}
          >
            {/* CHECKBOXES */}
            {this.props.checkBoxRow &&
            !secondItem.isDisabled &&
            secondItem.dependencyFilter !== "1" ? (
              // <TableCell padding="checkbox" className="text-center">
              //   <Checkbox
              //     onChange={event =>
              //       this.handleRowCheckBoxClick(secondItem, index, event)
              //     }
              //     checked={this.isSelected(secondItem.id)}
              //     inputProps={{ 'aria-labelledby': labelId }}
              //   />
              // </TableCell>
              <TableCell padding="checkbox" className="text-center"></TableCell>
            ) : this.props.checkBoxRow &&
              secondItem.isDisabled &&
              secondItem.dependencyFilter !== "1" ? (
              <TableCell padding="checkbox" className="text-center">
                <RemoveCircle style={{ color: "indianred" }} />
              </TableCell>
            ) : this.props.checkBoxRow &&
              secondItem.dependencyFilter === "1" ? (
              <TableCell padding="checkbox" className="text-center">
                <Menu />
              </TableCell>
            ) : (
              this.props.checkBoxRow && (
                <TableCell padding="checkbox"></TableCell>
              )
            )}

            {/* SKU */}
            <TableCell align={"center"} style={{ width: 82 }}>
              {secondItem.itemCode}
            </TableCell>

            {/* DESCRIPCION */}
            <TableCell align={"center"} style={{ width: 420 }}>
              {this.renderRowDescritionHelper(
                secondItem.lineType,
                secondItem.description,
                secondItem.id
              )}
            </TableCell>

            {/* CANTIDAD */}
            <TableCell align={"center"} style={{ width: 100 }}>
              {secondItem.quantity}
            </TableCell>

            {/* PIEZAS RETORNADAS */}
            {!secondItem.isDisabled && secondItem.dependencyFilter !== "1" ? (
              <TableCell align={"center"} style={{ width: 100 }}>
                {secondItem.onPreviousTickets}
              </TableCell>
            ) : (
              <TableCell style={{ width: 100 }}></TableCell>
            )}

            {/* MONTO */}
            <TableCell align={"center"} style={{ width: 100 }}>
              <Currency quantity={secondItem.amount} />
            </TableCell>

            {/* ACCIONES */}

            {this.props.actionsRow &&
            !secondItem.isDisabled &&
            secondItem.dependencyFilter !== "1" ? (
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    style={{ outline: "none", color: "#7f9e7f" }}
                    aria-label="add"
                    onClick={() =>
                      this.handleUpDownQuantity(secondItem, "plus")
                    }
                  >
                    <AddCircle />
                  </IconButton>
                  <span>{secondItem.manualQuantity}</span>
                  <IconButton
                    style={{ outline: "none", color: "#b97c7c" }}
                    aria-label="rest"
                    onClick={() =>
                      this.handleUpDownQuantity(secondItem, "minus")
                    }
                  >
                    <RemoveCircle />
                  </IconButton>
                </div>
              </TableCell>
            ) : (
              <TableCell></TableCell>
            )}
          </TableRow>,
          // CHILD ROW
          <TableRow key={`child${index}`}>
            <TableCell
              align={"center"}
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={7}
            >
              <Collapse
                in={this.state.collapsedRow === index}
                timeout="auto"
                unmountOnExit
              >
                <Table size="small">
                  <TableBody>
                    {this.renderRowChilds(
                      this.props.data,
                      secondItem.id.toString()
                    )}
                  </TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>,
        ];
      });
  };

  render() {
    return (
      <TableContainer>
        <Table stickyHeader>
          <TableHead>{this.renderTitles()}</TableHead>
          <TableBody>{this.renderRows()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

TableWithCollapsibleRows.defaultProps = {
  data: [],
  checkBoxRow: false,
  actionsRow: false,
  handleDataToProcess: () => {},
  fieldToProcessData: "property",
};

TableWithCollapsibleRows.propTypes = {
  data: PropTypes.array.isRequired,
  checkBoxRow: PropTypes.bool,
  actionsRow: PropTypes.bool,
  handleDataToProcess: PropTypes.func,
  fieldToProcessData: PropTypes.string,
};
